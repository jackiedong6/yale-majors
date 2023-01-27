import { useCallback, useEffect, useState } from "react";

import axios from "../utils/axios";
import UserContext from "../contexts/userContext";

const UserContextProvider = ({ children }) => {
    console.log("hello world")
    console.log(document.cookie)
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState();
    const [courseList, setCourseList] = useState();
    const checkContext = useCallback(() => {
        axios.get("auth/check", {
            method: 'GET',
        }, {
            withCredentials: true
        })
            .then(({ data}) => {
                console.log(data)
                if (data.auth) {
                    setIsAuthenticated(true);
                    setUser(data.user);
                    setCourseList(data.courseList);
                    setIsLoading(false);
                } else {
                    setIsAuthenticated(false);
                    setCourseList(undefined);
                    setUser(undefined);
                    setIsLoading(false);
                }
            })
            .catch(() =>
                console.log(
                    "Something went wrong while trying to fetch your auth status."
                )
            );
    }, []);

    useEffect(() => {
        checkContext();
    }, [checkContext]);

    return (
        <UserContext.Provider
            value={{
                isLoading,
                isAuthenticated,
                user,
                courseList,
                setCourseList,
                checkContext,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
