import React, { useState, useEffect } from "react";
import ListItem from "../list_item/list_item";
import "./list.css";

export default function List({ listTitle="List", itemCheckbox=false}){
    const emptyListItem = {
        itemName: "",
        quantity: "",
        unit: "",
        checkBox: itemCheckbox,
        checkBoxValue: false,
        onChange: undefined
    }

    const [listItems, setListItems] = useState([{...emptyListItem}]);
    
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

    return (
        <div className="list-container">
            <h2>{listTitle}</h2>
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