import "./styles.css";
import Authentication from "./authentication";

const Navbar = () => {

    return (

        <nav className="navbar_items">
            <img className="icon" rel="icon" src="touch-icon-228.png" alt=""/>
            <h1 className>ale Majors</h1>
            <Authentication></Authentication>
        </nav>
    )
}


export default Navbar;