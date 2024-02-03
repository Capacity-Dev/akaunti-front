
import { useEffect } from "react";
import useSessionStorage from "./useLocalStorage";
import { useUser } from "./useUser"


export const useAuth = () => {
    const {user, addUser, removeUser} = useUser();
    const {getItem} = useSessionStorage();

    useEffect(()=>{
        const userJSON = getItem("user");
        if (userJSON !== null ) {
            addUser(JSON.parse(userJSON));
        }
    },[])

    function login(user) {
        addUser(user);
    }
    function logout(){
        removeUser();
    }
    function isAuthenticated() {
        return user !== null;
    }

    return {user, login, logout, isAuthenticated}
}