import axios from "axios";

export const getStandards = () => {
  try {
    const promise = axios.get(
      "https://humber-capstone-backend.herokuapp.com/standards"
    );
    const data = promise.then((response) => response.data);
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
