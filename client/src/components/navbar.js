import "./styles.css";
import Authentication from "./authentication";
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    return (

        <nav className="navbar_items">
            <img className="icon" rel="icon" src="touch-icon-228.png" alt=""/>
            <h1 onClick={() => navigate("/")}>ale Majors</h1>
            <Authentication></Authentication>
        </nav>
    )
}


export default Navbar;