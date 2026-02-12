import {useAuthContext} from "react-oauth2-code-pkce";
import {Navigate, Outlet} from "react-router-dom";


const ProtectedRoute = () => {
    const { token } = useAuthContext(); // Get the current user/auth status
    return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;