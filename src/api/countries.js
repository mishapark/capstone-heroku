import useFetch from "react-fetch-hook";
export const { isLoading, error, data } = useFetch(
  "https://restcountries.com/v3.1/region/europe"
);
