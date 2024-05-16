import React from "react";
import "./household.css";

/**
 * Represents single household component for admin page.
 * @param {Object} props - The component props.
 * @param {Object} props.household - The household object.
 * @returns {JSX.Element} The household component.
 */
const Household = (props: { household: any }) => {
    const { household } = props;

    const handleEditHousehold = (id: string) => {
        // Implement logic to edit household with the specified id
    };

    const handleRemoveHousehold = (id: string) => {
        // Implement logic to remove household with the specified id
    };

    return (
        <div className="households">
            <div key={household._id} className="user">
                <div className="user-actions">
                    <button
                        className="remove-button"
                        onClick={() => handleRemoveHousehold(household._id)}
                    >
                        X
                    </button>
                    <button onClick={() => handleEditHousehold(household._id)}>
                        Edit
                    </button>
                </div>
                <div className="user-details">
                    <h3>Id: {household._id}</h3>
                    <p>Name: {household.name}</p>
                    <p>Members: {household.members.join(", ")}</p>
                </div>
            </div>
        </div>
    );
};

export default Household;
