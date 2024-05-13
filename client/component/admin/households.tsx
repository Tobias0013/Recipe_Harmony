import React from "react";
import "./household.css"; 

// TODO: Remove this and fetch from API
const Household = () => {
    const sampleHousehold = {
        _id: "663a27521f8b65134101798b",
        name: "Dannes hem",
        members: ["Kristoffer Larsson"],
        shopping_list: [],
        ingredients: []
    };

    const handleEditHousehold = (id) => {
        // Implement logic to edit household with the specified id
    };

    const handleRemoveHousehold = (id) => {
        // Implement logic to remove household with the specified id
    };

    return (
        <main>
            <section>
                <h1>HOUSEHOLD DETAILS</h1>
                <div className="households">
                    <div key={sampleHousehold._id} className="user">
                        <div className="user-actions">
                            <button className="remove-button" onClick={() => handleRemoveHousehold(sampleHousehold._id)}>X</button>
                            <button onClick={() => handleEditHousehold(sampleHousehold._id)}>Edit</button>
                        </div>
                        <div className="user-details">
                            <h3>Id: {sampleHousehold._id}</h3>
                            <p>Name: {sampleHousehold.name}</p>
                            <p>Members: {sampleHousehold.members.join(", ")}</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Household;
