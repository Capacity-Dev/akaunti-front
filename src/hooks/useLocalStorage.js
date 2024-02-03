import { useState } from "react"


const useSessionStorage = () => {
    const [value, setValue] = useState(null);

    function getItem(key){
        const value = window.sessionStorage.getItem(key);
        setValue(value);
        return value;
    }
    function setItem(key,value) {
        window.sessionStorage.setItem(key,value);
        setValue(value);
    }
    function removeItem(key){
        window.sessionStorage.removeItem(key);
        setValue(null);
    }

    return {value, getItem, setItem, removeItem}
}

export default useSessionStorage;