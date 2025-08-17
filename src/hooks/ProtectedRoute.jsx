import { useSesion } from "../store/authStore"
import { Navigate } from "react-router-dom";


export const ProtectedRoute = ({children, authenticated=true}) => {
    const { user } = useSesion();
    if (authenticated === false) {
        if (!user) {
            return children;
        }else{
            return <Navigate to={"/"} replace />;
        }
    }

    if (authenticated ){
        if(user){
            return children;
        }else{
            return <Navigate to={"/login"} replace />;
        }
    }
    
    return <Navigate to={"/login"} replace />;
}