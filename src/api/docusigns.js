import axios from "axios";


export const signDocument = (clientId, rfqNumber) => {
    try {

        const promise = axios.post(`https://humber-capstone-backend.herokuapp.com/docusigns`, {
            client_id: clientId,
            rfq_number: rfqNumber,
        });

        const data = promise.then((response) => response.data);
        return data;
    } catch (err) {
        console.log(err.message);
    }
}