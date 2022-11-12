import React from "react";
import {Route, Routes} from "react-router-dom";
import AdminMenu from "@src/views/admin/AdminMenu";

const AdminRouter: React.FunctionComponent = () =>{

    return(
        <Routes>
            <Route path={"/"} element={<AdminMenu/>}/>
        </Routes>
    )
};

export default AdminRouter;