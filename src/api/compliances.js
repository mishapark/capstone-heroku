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
