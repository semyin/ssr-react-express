import { Outlet } from "react-router";

export { DefaultLayout };

function DefaultLayout() {
    return (
        <div className="default-layout">
            <Outlet /> 
        </div>
    );
}