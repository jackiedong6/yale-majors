import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import axios from "../utils/axios";
import UserContext from "../contexts/userContext";
import Button from "@mui/material/Button";
import "./styles.css"


const Authentication = () => {

    const auth_backend ="https://yalemajorsapi.com/api/auth/cas"
    const cas = () => {
        window.open(auth_backend, "_self");
    };

    const {isAuthenticated, checkContext} = useContext(UserContext);

    const navigate = useNavigate();
    if (isAuthenticated) {
        return (
            <Button
                className="logout"
                onClick={() =>
                    axios.get("/auth/logout").then(({data}) => {
                        if (data.success) {
                            checkContext();
                            navigate("/");
                        }
                    })
                }
                sx={{
                    fontFamily: "Computer Modern Sans, sans-serif",
                    fontWeight: "bold",
                    color: "white",
                    borderColor: "transparent",
                    fontSize: "1.5rem",
                    marginLeft: "auto",
                    "&:hover": {backgroundColor: "transparent", borderColor: "transparent"}
                }}>
                Logout
            </Button>
        );
    } else {
        return (
            <Button variant="outlined" onClick={cas}
                    sx={{
                        fontFamily: "Computer Modern Sans, sans-serif",
                        fontWeight: "bold",
                        color: "white",
                        borderColor: "transparent",
                        fontSize: "1.5rem",
                        marginLeft: "auto",
                        "&:hover": {backgroundColor: "transparent", borderColor: "transparent"}
                    }}>
                Login
            </Button>
        )
    }
};

export default Authentication;
