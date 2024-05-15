import React from "react";
import "./list_item.css";

export default function ListItem({ index, itemName="", quantity="", unit="", checkBox=false, checkBoxValue=true, onChange }) {
    return(
        <div className="item-container" key={index}>
            {checkBox && <input type="checkbox" id="itemCheckbox" checked={checkBoxValue} onChange={(e) => onChange(index, "itemCheckbox", e.target.checked)}/>}
            <input type="text" id="listItem" placeholder="Enter item" value={itemName} onChange={(e) => onChange(index, "listItem", e.target.value)}/>
            <input type="number" id="listItemQuantity" placeholder="Enter quantity" value={quantity} onChange={(e) => onChange(index, "listItemQuantity", e.target.value)}/>
            <input type="text" id="listItemUnit" placeholder="Enter unit" value={unit} onChange={(e) => onChange(index, "listItemUnit", e.target.value)}/>
        </div>
    );
}