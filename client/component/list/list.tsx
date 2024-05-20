import React, { useEffect } from "react";
import useState from "react-usestateref"
import ListItem from "../list_item/list_item";
import householdAPI from "../../controller/fetch/household";
import "./list.css";

export default function List({ listTitle = "List", shoppingList = false }) {
    const emptyListItem = {
        itemName: "",
        quantity: "",
        unit: "",
        checkBox: true,
        checkBoxValue: false,
        onChange: undefined
    }

    const [listItems, setListItems, listItemsRef] = useState([{ ...emptyListItem }]);
    const [itemsToDelete, setItemsToDelete, itemsToDeleteRef] = useState<number[]>([]);
    const [deletedItems, setDeletedItems, deletedItemsRef] = useState([{ ...emptyListItem }]);
    const [loadedList, setLoadedList] = useState<boolean>(false);

    const retrieveList = async () => {
        let list;
        if (shoppingList) {
            const listResponse = await householdAPI.getShoppingList();
            list = listResponse.shoppingList;
        } else {
            const listResponse = await householdAPI.getIngredientsList();
            list = listResponse.ingredientsList;
        }
        if(list !== null){
            setLoadedList(true);
            const formatedList = list.map(item => {
                return ({
                    itemName: item.name,
                    quantity: item.quantity === 0 ? "" : item.quantity,
                    unit: item.quantity_type,
                    checkBox: true,
                    checkBoxValue: false,
                    onChange: handleInputChange
                })
            });
    
            setListItems([...formatedList, { ...emptyListItem }]);
        }
        
    }

    useEffect(() => {
        //retrieve list from database on page load
        retrieveList();
    }, [])

    const updateList = async () => {
        const formatedListForDB = listItemsRef.current.map(item => {
            return ({
                name: item.itemName,
                quantity: item.quantity === "" ? 0 : parseInt(item.quantity, 10),
                quantity_type: item.unit
            })
        });
        formatedListForDB.splice(formatedListForDB.length - 1, 1) //remove last item which is always empty
        if (shoppingList) {
            const response = await householdAPI.replaceShoppingList(formatedListForDB);
        } else {
            const response = await householdAPI.replaceIngredientsList(formatedListForDB);
        }

    }

    useEffect(() => {
        //auto save changes to shopping list. triggered on listItems changed
        if (shoppingList || !shoppingList) {
            const timerId = setTimeout(updateList, 1000);
            setItemsToDelete([]); //reset and check each item if checkbox is checked
            setDeletedItems([]);
            for (let index in listItems) {
                if (listItems[parseInt(index, 10)].checkBoxValue === true) {
                    setItemsToDelete([...itemsToDeleteRef.current, parseInt(index, 10)]);
                    setDeletedItems([...deletedItemsRef.current, listItems[parseInt(index, 10)]])
                }
            }
            return () => clearTimeout(timerId);
        }
    }, [listItems])


    const handleInputChange = (index: number, inputId: string, newValue: any) => {
        const newListItems = [...listItems];
        const currentItem = newListItems[index];

        switch (inputId) {
            case "listItem":
                currentItem.itemName = newValue;
                break;
            case "listItemQuantity":
                currentItem.quantity = newValue;
                break;
            case "listItemUnit":
                currentItem.unit = newValue;
                break;
            case "itemCheckbox":
                currentItem.checkBoxValue = newValue;
                break;
            default:
                break;
        }

        setListItems(newListItems);

        if (inputId === "itemCheckbox") {
            if (newValue === true) {
                setItemsToDelete(prevItemsToDelete => [...prevItemsToDelete, index]);
                setDeletedItems(prevDeletedItems => [...prevDeletedItems, currentItem])
            } else {
                const indexExists = itemsToDelete.includes(index);
                if (indexExists) {
                    setItemsToDelete(itemsToDelete.filter(index => index !== index));
                    setDeletedItems(deletedItems.filter((item, idx) => idx !== index));
                }
            }
        }

        //create new item input if all are current ones are in use
        //or delete item input if all fields are empty in the item input
        if (newValue && listItems[listItems.length - 1].itemName !== "") {
            setListItems(prevListItems => [...prevListItems, { ...emptyListItem }]);
        } else if (inputId !== "itemCheckbox" && (listItems[index].itemName === "" && listItems[index].quantity === "" && listItems[index].unit === "")) {
            const prevListItems = [...listItems];
            prevListItems.splice(index, 1);
            setListItems(prevListItems);
        }
    };

    const handleButtonClick = async () => {
        deleteCheckedItems();
        await moveDeletedItemsToIngredients();
    }

    const deleteCheckedItems = () => {
        let counter: number = 0; //counter is used to adjust the index. when one element is removed, all other elements index decrease by one
        itemsToDeleteRef.current.forEach((index) => {
            const prevListItems = [...listItemsRef.current];
            prevListItems.splice(index - counter, 1);
            counter++;
            setListItems(prevListItems);
        })
        if (listItemsRef.current.length !== 0 && listItemsRef.current[listItemsRef.current.length - 1].itemName !== "") {
            setListItems(prevListItems => [...prevListItems, { ...emptyListItem }]);
        } else if (listItemsRef.current.length === 0) {
            setListItems(prevListItems => [...prevListItems, { ...emptyListItem }]);
        }
    }

    async function moveDeletedItemsToIngredients() {
        const itemsToAppend: any[] = [];
        deletedItemsRef.current.forEach(async (itemToDelete) => {
            if (validItem(itemToDelete)) {
                const formatedItemForDB = {
                    name: itemToDelete.itemName,
                    quantity: itemToDelete.quantity === "" ? 0 : parseInt(itemToDelete.quantity, 10),
                    quantity_type: itemToDelete.unit
                }
                itemsToAppend.push(formatedItemForDB);
                setDeletedItems([]);
            }
        });
        const response = await householdAPI.appendIngredientsList(itemsToAppend);
        console.log(itemsToAppend)
        
    }

    function validItem(item) {
        if (item.itemName !== "") {
            return true;
        }
        return false;
    }


    return (
        loadedList && (<div className="list-container">
            <h2>{listTitle}</h2>
            {shoppingList && (itemsToDelete.length > 0 ? <button onClick={handleButtonClick} disabled={false}>Mark checked items as purchased</button> : <button onClick={handleButtonClick} disabled={true}>Mark checked items as purchased</button>)}
            {!shoppingList && (itemsToDelete.length > 0 ? <button onClick={handleButtonClick} disabled={false}>Remove checked items</button> : <button onClick={handleButtonClick} disabled={true}>Remove checked items</button>)}
            <div className="list-headers">
                <h3>Item</h3>
                <h3>Qty</h3>
                <h3>Unit</h3>
            </div>
            {listItems.map((item, index) => (
                <ListItem
                    key={index}
                    index={index}
                    itemName={item.itemName}
                    quantity={item.quantity}
                    unit={item.unit}
                    checkBox={item.checkBox}
                    checkBoxValue={item.checkBoxValue}
                    onChange={handleInputChange}
                />
            ))}
        </div>)

    );
}