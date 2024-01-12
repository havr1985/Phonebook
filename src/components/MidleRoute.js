import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import { selectAuthAuthenticated } from "redux/auth.selector"




export const MidleRoute = ({ component: Component, redirectTo = '/' }) => {
    
    const authenticated = useSelector(selectAuthAuthenticated);

    return authenticated ? <Navigate to={redirectTo} /> : Component;
}