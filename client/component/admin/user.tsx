import React from "react";
import "./users.css"; // Import the CSS file

/**
 * Represents single user component for admin page.
 * @param {Object} props - The component props.
 * @param {Object} props.user - The user object to be rendered.
 * @returns {JSX.Element} The single user component.
 */
const User = (props: { user: any }) => {
    const { user } = props;

    const handleRemoveUser = () => {
        // Implement logic to remove user with the specified id
    };

    const handleEditUser = () => {
        // Implement logic to edit user with the specified id
    };

    return (
        <div className="users">
            <div key={user._id} className="user">
                <div className="user-actions">
                    <button
                        className="remove-button"
                        onClick={() => handleRemoveUser()}
                    >
                        X
                    </button>
                    <button onClick={() => handleEditUser()}>Edit</button>
                </div>
                <div className="user-details">
                    <h3>Id: {user._id}</h3>
                    <p>Name: {user.full_name}</p>
                    <p>Email: {user.email}</p>
                    <p>Joined: {new Date(user.joined).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    );
};

export default User;
