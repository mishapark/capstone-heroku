import axios from "axios";

export const getRfqs = () => {
    try {
        const promise = axios.get(
            "https://humber-capstone-backend.herokuapp.com/rfqs"
        );
        const data = promise.then((response) => response.data);
        return data;
    } catch (err) {
        console.log(err.message);
    }
};

export const getRfqsWithToken = (token) => {
    try {

        let headers = {
            "x-auth-token": token
        }

        const promise = axios.get(
            "https://humber-capstone-backend.herokuapp.com/rfqs",
            {headers}
        );
        const data = promise.then((response) => response.data);
        return data;
    } catch (err) {
        console.log(err.message);
    }
};


export const getRfqsApproversWithToken = (token) => {
    try {

        let headers = {
            "x-auth-token": token
        }

        const promise = axios.get(
            "https://humber-capstone-backend.herokuapp.com/rfqs/findApprovers",
            {headers}
        );
        const data = promise.then((response) => response.data);
        return data;
    } catch (err) {
        console.log(err.message);
    }
};
