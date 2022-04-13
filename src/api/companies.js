import axios from "axios";

export const getCompany = (id) => {
    try {
        const promise = axios.get(
            "https://humber-capstone-backend.herokuapp.com/companies/" + id
        );
        const data = promise.then((response) => response.data);
        return data;
    } catch (err) {
        console.log(err.message);
    }
};


export const updateCompany = (id, company) => {
    try {

        const promise = axios.put(
            "https://humber-capstone-backend.herokuapp.com/companies/update/" + id,
            company

        );
        const data = promise.then((response) => response.data);
        return data;

    } catch (err) {
        console.log(err.message);
    }
}

export const createCompany = (company) => {
    try {

        const promise = axios.post(
            "https://humber-capstone-backend.herokuapp.com/companies/add/",
            company

        );
        const data = promise.then((response) => response.data);
        return data;

    } catch (err) {
        console.log(err.message);
    }
}

