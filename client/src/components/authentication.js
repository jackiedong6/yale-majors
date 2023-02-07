import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import axios from "../utils/axios";
import UserContext from "../contexts/userContext";
import Button from "@mui/material/Button";
import "./styles.css"


const Authentication = () => {

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
                    fontFamily: "YaleFont",
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
    }
};

export default Authentication;
