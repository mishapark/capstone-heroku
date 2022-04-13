import axios from "axios";

export const getCompanyUsers = (id) => {
    try {
        const promise = axios.get(
            "https://humber-capstone-backend.herokuapp.com/companyusers/company/" + id
        );
        const data = promise.then((response) => response.data);
        return data;
    } catch (err) {
        console.log(err.message);
    }
};

export const getUsersByEmail = (address) => {
    try {
        const promise = axios.get(
            "https://humber-capstone-backend.herokuapp.com/companyusers/email/" + address
        );
        const data = promise.then((response) => response.data);
        return data;
    } catch (err) {
        console.log(err.message);
    }
};

export const deleteCompanyUser = (companyId, userId) => {
    try {
        const promise = axios.delete(
            "https://humber-capstone-backend.herokuapp.com/companyusers/delete/" + companyId + "/" + userId
        );
        const data = promise.then((response) => response.data);
        return data;
    } catch (err) {
        console.log(err.message);
    }
}

export const addCompanyUser = (companyId, userId) => {
    try {
        const promise = axios.post(
            "https://humber-capstone-backend.herokuapp.com/companyusers/update/" + companyId + "/" + userId
        );
        const data = promise.then((response) => response.data);
        return data;
    } catch (err) {
        console.log(err.message);
    }
}