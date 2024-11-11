import { Outlet } from "react-router-dom";
import Header from "../header/Header";

function AuthLayout() {

    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    );
}
export default AuthLayout;