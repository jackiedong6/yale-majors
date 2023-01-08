import UserContext from "../contexts/userContext";
import {useContext} from "react";
import Home from "./home"

const Landing = () => {
    const {isAuthenticated} = useContext(UserContext);

    // The user is logged in
    if (isAuthenticated) {
        return (
            <div className = "container home">
                    <Home></Home>
                </div>
        );
    }
    // The user is not logged in
    else {
        return (
            <div className="container login">
                <h1>Visualize Yale Major Requirements.</h1>
            </div>
        );
    }

};

export default Landing;
