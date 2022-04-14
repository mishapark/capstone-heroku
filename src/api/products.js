import axios from "axios";

export const getProducts = () => {
    try {
        const promise = axios.get(
            "https://humber-capstone-backend.herokuapp.com/products"
        );
        const data = promise.then((response) => response.data);
        return data;
    } catch (err) {
        console.log(err.message);
    }
};

export const getProductsWithToken = (token) => {
    try {

        let headers = {
            "x-auth-token": token
        }

        const promise = axios.get(
            "https://humber-capstone-backend.herokuapp.com/products",
            {headers}
        );
        const data = promise.then((response) => response.data);
        return data;
    } catch (err) {
        console.log(err.message);
    }
};
