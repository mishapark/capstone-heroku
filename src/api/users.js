import axios from "axios";

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