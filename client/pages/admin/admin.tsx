import React from "react";
import Users from "../../component/admin/users";
import Receips from "../../component/admin/recipes";
import Households from "../../component/admin/households";

const AdminPage: React.FC = () => {
    return (
        <div>
            <h1>ADMIN PAGE</h1>
            <div>
                <Users />
            </div>
            <Receips />
            <Households />
        </div>
    );
};

export default AdminPage;
