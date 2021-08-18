import { auth } from "./firebase"
import { authContext } from "./AuthProvider"
import { useContext } from "react";
import {Redirect} from "react-router-dom"
let Home = () => {
    let user = useContext(authContext);
    return (
        <>
            {user?"":<Redirect to="/login"/>}
            Home
            <br />
            <br />
            <button onClick={()=>{
                auth.signOut();
            }} className="btn btn-primary m-4">Logout</button>
        </>

    );
}

export default Home;