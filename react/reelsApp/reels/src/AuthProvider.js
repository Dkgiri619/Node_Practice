import { createContext, useEffect, useState } from "react";
import { auth } from "./firebase";
export const authContext = createContext();
let AuthProvider = (props) => {
    let [user, setUser] = useState(null);
    let [loading, setLoading] = useState(true);
    useEffect(() => {
        let unsub = auth.onAuthStateChanged((user) => { // this predifined fn returns a similar event like removeEventListener

            if (user) {
                let { displayName, email, uid, photoURL } = user;
                setUser(user);
                console.log({ displayName, email, uid, photoURL });
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => {
            unsub(); // this is cleanup fn, it runs in this case when the component is going to unmount
            console.log("unmounted auth");
        }


    },[]); // this will run on mount and cleanup will run on unmount
    return <>
            <authContext.Provider value={user}>
                {!loading && props.children}
            </ authContext.Provider >

        </>

};

        export default AuthProvider;