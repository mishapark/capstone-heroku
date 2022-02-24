import { useState, useEffect } from "react";
import axios from "axios";

const useProducts = (url) => {
  const [products, setProducts] = useState();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => setProducts(response.data))
      .catch((err) => setError(err))
      .finally(setIsLoading(false));
  }, [url]);

  return { products, error, isLoading };
};

export default useProducts;
