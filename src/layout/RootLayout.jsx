import { Outlet } from "react-router-dom";
import Header from "./header/Header";

// eslint-disable-next-line react/prop-types
function RootLayout({ children }) {

    return (
        <>
            <Header />
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <Outlet context={children} />
                </div>
            </main>
        </>
    );
}
export default RootLayout;