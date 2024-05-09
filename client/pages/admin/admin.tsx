import React from "react";
import Users from "../../component/admin/users";
import Receips from "../../component/admin/recipes";
import Households from "../../component/admin/households";
import userAPI from "../../controller/fetch/users";
import { useEffect, useState } from "react";

const AdminPage: React.FC = () => {
    const jwtExists = sessionStorage.getItem("jwt");

    const [users, setUsers] = useState<any>();

    /*
        TODO:
        Move this function to each admin component instead of this page
    */
    useEffect(() => {
        const getData = async () => {
            if (jwtExists) {
                try {
                    const response: Response = await userAPI.user.getAll(jwtExists)
                    const data = await response.json();
                    if(!data.error){
                        setUsers(data)
                    }
                } catch (e) {
                    console.log(e)
                }
            }
        }
        getData();

    }, [])

    return (
        users && (<div>
            <h1>ADMIN PAGE</h1>
            <div>
                <Users />
            </div>
            <Receips />
            <Households />
        </div>
        )
    );

};

export default AdminPage;
