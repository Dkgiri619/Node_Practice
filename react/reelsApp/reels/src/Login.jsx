import { useContext } from "react";
import { signInWithGoogle } from "./firebase"
import {authContext} from "./AuthProvider"
import { Redirect } from "react-router-dom";
let Login = () => {
    let user = useContext(authContext);
    return (
        <>
            {user?<Redirect to= "/"/>:""}
            <button className="btn btn-primary m-4" onClick={() => {
                signInWithGoogle();
            }}>Login with Google</button>
        </>
    );
}
export default Login;