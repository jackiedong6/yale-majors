import { createContext } from "react";

export const defaultUserContext = {
    isLoading: true,
    isAuthenticated: false,
    user: undefined,
    courseList: undefined,
    checkContext: () => {},
};

export default createContext(defaultUserContext);
