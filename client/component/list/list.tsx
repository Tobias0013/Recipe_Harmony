import React, { useEffect } from "react";
import useState from "react-usestateref"
import ListItem from "../list_item/list_item";
import householdAPI from "../../controller/fetch/household";
import "./list.css";

export default function List({ listTitle="List", shoppingList=false}){
    const emptyListItem = {
        itemName: "",
        quantity: "",
        unit: "",
        checkBox: shoppingList,
        checkBoxValue: false,
        onChange: undefined
    }

    const [listItems, setListItems, listItemsRef] = useState([{...emptyListItem}]);
    const [itemsToDelete, setItemsToDelete, itemsToDeleteRef] = useState<number[]>([]);

    const retrieveShoppingList = async () => {
        const shoppingListResponse = await householdAPI.getShoppingList();
        const formatedShoppingList = shoppingListResponse.shoppingList.map(item => {
            return ({
                itemName: item.name,
                quantity: item.quantity === 0 ? "" : item.quantity,
                unit: item.quantity_type,
                checkBox: true,
                checkBoxValue: false,
                onChange: handleInputChange
            })
        });

        setListItems([...formatedShoppingList, {...emptyListItem}]);
    }
    
    useEffect(() => {
        //retrieve shopping list from database on page load
        if(shoppingList){
            retrieveShoppingList();
        }
    }, [])

    const updateShoppingList = async () => {
        console.log(listItemsRef.current)
        const formatedShoppingListForDB = listItemsRef.current.map(item => {
            return ({
                name: item.itemName,
                quantity: item.quantity === "" ? 0 : parseInt(item.quantity, 10),
                quantity_type: item.unit
            })
        });
        formatedShoppingListForDB.splice(formatedShoppingListForDB.length-1, 1) //remove last item which is always empty
        const response = await householdAPI.replaceShoppingList(formatedShoppingListForDB);
    }

    useEffect(() => {
        //auto save changes to shopping list. triggered on listItems changed
        if(shoppingList){
            const timerId = setTimeout(updateShoppingList, 1000);
            setItemsToDelete([]); //reset and check each item if checkbox is checked
            for(let index in listItems){
                if(listItems[parseInt(index, 10)].checkBoxValue === true){
                    setItemsToDelete([...itemsToDeleteRef.current, parseInt(index, 10)]);
                }
            }
            return () => clearTimeout(timerId);
        }
    }, [listItems])

    
    const handleInputChange = (index: number, inputId: string, newValue: any) => {
        const newListItems = [...listItems];
        const currentItem = newListItems[index];

        switch(inputId){
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

        if(inputId === "itemCheckbox"){
            if(newValue === true){
                setItemsToDelete(prevItemsToDelete => [...prevItemsToDelete, index]);
                
            }else{
                const indexExists = itemsToDelete.includes(index);
                if(indexExists){
                    setItemsToDelete(itemsToDelete.filter(index => index !== index));
                }
            }
        }
        
        //create new item input if all are current ones are in use
        //or delete item input if all fields are empty in the item input
        if(newValue && listItems[listItems.length-1].itemName !== ""){
            setListItems(prevListItems => [...prevListItems, {...emptyListItem}]);
        }else if(inputId !== "itemCheckbox" && (listItems[index].itemName === "" && listItems[index].quantity === "" && listItems[index].unit === "")){
            const prevListItems = [...listItems];
            prevListItems.splice(index, 1);
            setListItems(prevListItems);
        }
    };


    const deleteCheckedItems = () => {
        let counter: number = 0; //counter is used to adjust the index. when one element is removed, all other elements index decrease by one
        itemsToDeleteRef.current.forEach((index) => {
            const prevListItems = [...listItemsRef.current];
            prevListItems.splice(index-counter, 1);
            counter++;
            setListItems(prevListItems);
        })
        if(listItemsRef.current.length !== 0 && listItemsRef.current[listItemsRef.current.length-1].itemName !== ""){
            setListItems(prevListItems => [...prevListItems, {...emptyListItem}]);
        }else if (listItemsRef.current.length === 0){
            setListItems(prevListItems => [...prevListItems, {...emptyListItem}]);
        }
    }

    

    return (
        <div className="list-container">
            <h2>{listTitle}</h2>
            {shoppingList && (itemsToDelete.length > 0 ? <button onClick={deleteCheckedItems} disabled={false}>Remove checked items</button> : <button onClick={deleteCheckedItems} disabled={true}>Remove checked items</button>)}
            <div className="list-headers">
                <h3>Item</h3>
                <h3>Quantity</h3>
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
        </div>
        
    );
}