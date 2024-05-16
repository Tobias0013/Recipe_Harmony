import React, { useEffect, useState }  from "react";
import { useNavigate } from "react-router-dom";

import User from "../../component/admin/user";
import Receips from "../../component/admin/recipes";
import Households from "../../component/admin/households";
import userAPI from "../../controller/fetch/users";

const AdminPage: React.FC = () => {
    const jwtExists = sessionStorage.getItem("jwt");
    const navigate = useNavigate();

    const [users, setUsers] = useState<any>();
    const [userError, setUserError] = useState<any>();
    /*
        TODO:
        Move this function to each admin component instead of this page
    */
    useEffect(() => {
        if (!jwtExists) {
            navigate("/");
            return;
        }

        const fetchUsers = (async () => {
            try {
                const response: Response = await userAPI.user.getAll(jwtExists);
                const data = await response.json();
                if (!data.error) {
                    setUsers(data);
                }
            } catch (e) {
                console.log(e);
                setUserError(e);
            }
        })();
    }, []);

    return (
        users && (
            <div>
                <h1 style={{ fontSize: "3rem" }}>ADMIN PAGE</h1>
                <section>
                    <h1 style={{ fontSize: "2rem" }}>USER DETAILS</h1>

                    {userError ? (
                        <div>Error: {userError}</div>
                    ) : (
                        users.map((user) => {
                            return <User key={user._id} user={user} />;
                        })
                    )}
                </section>
                <Receips />
                <Households />
            </div>
        )
    );
};

export default AdminPage;
