import {useContext} from "react";
import { AuthContext } from "../auth/AuthContext";



export default function Profile() {
    const {user} = useContext(AuthContext);
    console.log(user.email);
    // if(!user.email) window.location.replace("/");

    return(
        <div>
            <h1>Welcome to Profile, "USER EMAIL"</h1>
        </div>
    )
}