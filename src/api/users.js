import axios from "axios";

export const getUsers = () => {
    try {

        const promise = axios.get(
            "https://humber-capstone-backend.herokuapp.com/users/"
    
        );
        const data = promise.then((response) => response.data);
        return data;

    } catch (err) {
        console.log(err.message);
    }
}

export const updateUserRole = (user) => {
    try {

        const promise = axios.put(
            "https://humber-capstone-backend.herokuapp.com/users/changeRole/",
            user

        );
        const data = promise.then((response) => response.data);
        return data;

    } catch (err) {
        console.log(err.message);
    }
}