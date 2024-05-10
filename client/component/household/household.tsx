import React from 'react';
import './household.css';
function Household() {
    const sampleHousehold = {
        _id: "663a27521f8b65134101798b",
        name: "Kristoffers home",
        members: ["Kristoffer Larsson"],
        shopping_list: ["Margherita Pizza"],
        ingredients: ["Flour", "Parsley"]
    };

    return (
        <div className="household-page">
            <header className="header">
                <h1>Household: {sampleHousehold.name}</h1>
            </header>
            <section className="section">
                <h2>Members</h2>
                <div className="households">
                    <div key={sampleHousehold._id} className="user">
                        <div className="user-details">
                            <h3>Id: {sampleHousehold._id}</h3>
                            <p>Name: {sampleHousehold.name}</p>
                            <p>Members: {sampleHousehold.members.join(", ")}</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section">
                <h2>Shopping List</h2>
                <ul className="list">
                    {sampleHousehold.shopping_list.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
                <button className="btn">Add Item to Shopping List</button>
            </section>
            <section className="section">
                <h2>Ingredients</h2>
                <ul className="list">
                    {sampleHousehold.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
                <button className="btn">Add Ingredient</button>
            </section>
        </div>
    );
}

export default Household;
