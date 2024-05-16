import React from "react";
import "./list_item.css";

export default function ListItem({ index, itemName="", quantity="", unit="", checkBox=false, checkBoxValue=true, onChange }) {
    return(
        <div className="item-container" key={index}>
            {checkBox && <input type="checkbox" id="itemCheckbox" checked={checkBoxValue} onChange={(e) => onChange(index, "itemCheckbox", e.target.checked)}/>}
            {!checkBox && <input type="checkbox" style={{ visibility: "hidden" }}/>}
            <input type="text" id="listItem" value={itemName} onChange={(e) => onChange(index, "listItem", e.target.value)}/>
            <input type="number" id="listItemQuantity" value={quantity} onChange={(e) => onChange(index, "listItemQuantity", e.target.value)}/>
            <input type="text" id="listItemUnit" value={unit} onChange={(e) => onChange(index, "listItemUnit", e.target.value)}/>
        </div>
    );
}