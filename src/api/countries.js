import axios from "axios";

export const getCountries = () => {
  try {
    const promise = axios.get("https://restcountries.com/v3.1/all");
    const data = promise.then((response) => response.data);
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
