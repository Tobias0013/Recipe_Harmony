import React from 'react';
import { Link } from 'react-router-dom';
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
            <div className="header-container">
                <h1 className="header">Household: {sampleHousehold.name}</h1>
            </div>
            <p className="household-id">
            <span className="id-label">ID:</span>
            <span className="id-value">{sampleHousehold._id}</span>
            </p>
            <section className="section">
                <div className="members">
                    <h2>Members</h2>
                    <ul className="list">
                        {sampleHousehold.members.map((member, index) => (
                            <li key={index}>{member}</li>
                        ))}
                    </ul>
                    <Link to="/members" className="go-to-list">Go to Member List</Link>
                </div>
            </section>
            <section className="section">
                <h2>Shopping List</h2>
                <Link to="/shopping-list" className="go-to-list">Go to Shopping List</Link>
            </section>
            <section className="section">
                <h2>Ingredients</h2>
                <Link to="/ingredients" className="go-to-list">Go to Ingredients List</Link>
            </section>
        </div>
    );
}

export default Household;
