import React from "react";
import "./users.css"; // Import the CSS file

// TODO: Remove this and fetch from API
const User = () => {
    const sampleUser = {
        _id: "66324bc020c955d3e190ebd2",
        full_name: "Kristoffer",
        email: "kristoffer@email.com",
        joined: "2024-05-01T14:03:44.003+00:00",
        favorite_recipes: ["Classic Margherita Pizza"]
    };

    const handleRemoveUser = (id) => {
        // Implement logic to remove user with the specified id
    };

    const handleEditUser = (id) => {
        // Implement logic to edit user with the specified id
    };

    return (
        <main>
            <section>
                <h1>USER DETAILS</h1>
                <div className="users">
                    <div key={sampleUser._id} className="user">
                        <div className="user-actions">
                            <button className="remove-button" onClick={() => handleRemoveUser(sampleUser._id)}>X</button>
                            <button onClick={() => handleEditUser(sampleUser._id)}>Edit</button>
                        </div>
                        <div className="user-details">
                            <h3>Id: {sampleUser._id}</h3>
                            <p>Name: {sampleUser.full_name}</p>
                            <p>Email: {sampleUser.email}</p>
                            <p>Joined: {new Date(sampleUser.joined).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default User;
