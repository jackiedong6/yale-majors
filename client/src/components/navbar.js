import "./styles.css";
import Authentication from "./authentication";
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    return (

        <nav className="navbar_items">
            <img className="icon" rel="icon" src="navbarlogo.svg" alt=""/>
            <Authentication></Authentication>
        </nav>
    )
}


export default Navbar;