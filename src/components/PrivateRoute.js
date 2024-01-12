import { useSelector } from "react-redux"
import { selectAuthAuthenticated, selectAuthRegister } from "redux/auth.selector"
import { Navigate } from "react-router-dom";


export const PrivateRoute = ({ component: Component, redirectTo = '/contacts' }) => {
    const authenticated = useSelector(selectAuthAuthenticated);
    const registered = useSelector(selectAuthRegister)

    return authenticated && registered ?  Component : <Navigate to={redirectTo} /> ;

}