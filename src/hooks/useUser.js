import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import useSessionStorage from "./useLocalStorage"


export const useUser = () => {
    const {user, setUser} = useContext(AuthContext)
    const {setItem, removeItem,getItem} = useSessionStorage();

    /**
     * 
     * @param {{
     * username:string,
     * privillege:string,
     * token:string}} user 
     */
    function addUser(user){
        setUser(user)
        setItem("user",JSON.stringify(user))
    }
    function removeUser() {
        removeItem("user")
        setUser(null)
    }
    function getUser(){
        let userJSON = getItem("user")
        if (userJSON !=null) {
            let currentUser = JSON.parse(userJSON)
            setUser(currentUser)
            return currentUser
        }
        else return null
    }

    return {user, addUser, removeUser, getUser}
}