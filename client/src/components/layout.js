import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import "./styles.css";

const Layout = () => {
    return (
        <>
            <div className="App">
                <Navbar />
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
