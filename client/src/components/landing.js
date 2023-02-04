import UserContext from "../contexts/userContext";
import {useContext} from "react";
import Home from "./home"
import "./landing.css"


import {
    GoChecklist,
} from 'react-icons/go';

import {
    AiOutlineStock
} from 'react-icons/ai'


import Button from "@mui/material/Button";



const Landing = () => {
    const {isAuthenticated, checkContext} = useContext(UserContext);

    // const auth_backend = "http://localhost:5000/api/auth/cas"
    const auth_backend ="https://yalemajorsapi.com/api/auth/cas"

    const cas = () => {
        window.open(auth_backend, "_self");
    };
    // The user is logged in
    if (isAuthenticated) {
        return (<div className="home">
            <Home></Home>
        </div>);
    }
    // The user is not logged in
    else {
        return (
            <div className="container">
                <div className="elements">
                    <h1 className="about">
                        Choose your major today.
                    </h1>
                    <span className="feature_text">
                        <GoChecklist className="mr-2 my-auto" style={{color: "#63aaff", marginBottom: "-1%", marginRight: "2.5%"}}/>
                      Providing the ability to select your courses and track your progress across
                        several of Yale's majors
                    </span>
                    <br/>
                    <span className="feature_text">
                        <AiOutlineStock className="mr-2 my-auto" style={{color: "red", marginBottom: "-1%", marginRight: "2.5%"}}/>
                      Integrating new features at a rapid rate
                    </span>
                    <br/>
                    <Button variant="outlined" onClick={cas}
                            sx={{
                                marginTop: "5%;",
                                fontFamily: "Computer Modern Sans, sans-serif",
                                fontWeight: "bold",
                                color: "white",
                                borderColor: "transparent",
                                fontSize: "font-size: calc(1vmin + 8px);",
                                marginLeft: "auto",
                                background: "#286dc0 !important",
                                borderRadius: "15px",
                                transition: "0.3s",
                                filter: "0.3s",
                                "&:hover": {transform: "translateY(-5px)",filter: "brightness(150%)", borderColor: "black"}
                            }}>
                        Login with Cas
                    </Button>
                    <Button variant="outlined" onClick={cas} disabled = {true}
                            sx={{
                                marginTop: "5%;",
                                marginLeft:"5% !important",
                                fontFamily: "Computer Modern Sans, sans-serif",
                                fontWeight: "bold",
                                color: "black",
                                borderColor: "transparent",
                                fontSize: "font-size: calc(1vmin + 8px);",
                                background: "#dddddd !important",
                                borderRadius: "15px",
                                transition: "0.3s",
                                filter: "0.3s",
                                "&:hover": {transform: "translateY(-5px)",filter: "brightness(95%)", borderColor: "black"}
                            }}>
                        About Us
                    </Button>
                    {/*    About Us*/}
                </div>
                <div className="logo">
                    <img
                        src="landing.svg"
                        style={{width: '100%'}}
                    />
                </div>
            </div>
        );
    }

};

export default Landing;
