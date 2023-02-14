import UserContext from "../contexts/userContext";
import {useContext} from "react";
import {useNavigate} from "react-router-dom";
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
    const navigate = useNavigate();

    // const auth_backend = "http://localhost:5000/api/auth/cas"
    const auth_backend = "https://api.yalemajors.com/api/auth/cas"

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
                      Adding new features and supporting new majors on a demand basis
                    </span>
                    <br/>
                    <Button variant="outlined" onClick={cas}
                            sx={{
                                marginTop: "5%;",
                                fontFamily: "YaleFont",
                                fontWeight: "bold",
                                color: "white",
                                borderColor: "transparent",
                                fontSize: "font-size: calc(1vmin + 8px);",
                                marginLeft: "auto",
                                background: "#286dc0 !important",
                                borderRadius: "15px",
                                transition: "0.3s",
                                filter: "0.3s",
                                alignContent:"center",
                                justifyContent:"center",
                                textAlign:"center",
                                "&:hover": {transform: "translateY(-5px)",filter: "brightness(150%)", borderColor: "black"}
                            }}>
                        Login with CAS
                    </Button>
                    {/*<Button variant="outlined"  onClick={() => navigate("/about")}*/}
                    {/*        sx={{*/}
                    {/*            marginTop: "5%;",*/}
                    {/*            marginLeft:"5% !important",*/}
                    {/*            fontFamily: "YaleFont",*/}
                    {/*            fontWeight: "bold",*/}
                    {/*            color: "black",*/}
                    {/*            borderColor: "transparent",*/}
                    {/*            background: "#dddddd !important",*/}
                    {/*            borderRadius: "15px",*/}
                    {/*            transition: "0.3s",*/}
                    {/*            filter: "0.3s",*/}
                    {/*            "&:hover": {transform: "translateY(-5px)",filter: "brightness(95%)", borderColor: "black"}*/}
                    {/*        }}>*/}
                    {/*    About Us*/}
                    {/*</Button>*/}
                </div>
                <div className="logo">
                    <img
                        src="macbookpro.png" alt = "landing"
                        style={{width: '100%'}}
                    />
                </div>
            </div>
        );
    }

};

export default Landing;
