import axios from "axios";

export const getCompliances = () => {
  try {
    const promise = axios.get(
      "https://humber-capstone-backend.herokuapp.com/compliances"
    );
    const data = promise.then((response) => response.data);
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

export const createCompliance = (token, compliance) => {
    try {

        let config = {
            headers: {
                "x-auth-token": token
            },
        };

        const promise = axios.post(
            "https://humber-capstone-backend.herokuapp.com/compliances/add/",
            compliance,
            config

        );
        const data = promise.then((response) => response.data);
        return data;

    } catch (err) {
        console.log(err.message);
    }
}
