import React, { useEffect } from 'react';
import useState from "react-usestateref"
import { Link } from 'react-router-dom';
import './household.css';
import householdAPI from "../../controller/fetch/household";

function Household() {

    interface IHousehold {
        _id: string,
        name: string,
        members: string[],
        shopping_list: any,
        ingredients: any
    }

    const [household, setHousehold, householdRef] = useState<IHousehold>({
        _id: "",
        name: "",
        members: [],
        shopping_list: {},
        ingredients: {}
    });

    useEffect(() => {
        async function getHousehold() {
            const householdById = await householdAPI.getById();
            setHousehold(householdById.household);
        }

        getHousehold();
    }, [])

    return (
        (household) && (household._id !== "") && (<div className="household-page">
            <div className="header-container">
                <h1 className="header">{household.name}</h1>
            </div>
            <div className="household-id">
                <div>
                    <p className="id-label">Share this household ID with others to easily invite them to join your household: </p>
                    <p className="id-value">{household._id}</p>
                </div>
                <div>
                    <input type='text' placeholder='Household ID...'></input>
                    <button>Join</button>
                </div>
            </div>
            <section className="section">
                <div className="members">
                    <h2>Members</h2>
                    <ul className="list">
                        {household.members.map((member, index) => (
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
        </div>)
    );
}

export default Household;
