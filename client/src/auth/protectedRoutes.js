import { useContext } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import UserContext from "../contexts/userContext";
import PulseLoader from "react-spinners/PulseLoader";

const ProtectedRoutes = () => {
    const { isLoading, isAuthenticated } = useContext(UserContext);
    const location = useLocation();
    if (isLoading) {
        return <PulseLoader color="#66CCFF" size={10} />;
    }
    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/" replace state={{ from: location }} />
    );
};
export default ProtectedRoutes;
