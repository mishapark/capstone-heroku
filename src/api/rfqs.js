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
