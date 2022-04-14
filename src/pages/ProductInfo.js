import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FormattedMessage } from "react-intl";
import useProducts from "../hooks/useProducts";
import { useNavigate, useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails/ProductDetails";

function ProductInfo() {
  const [product, setProduct] = useState({});
  const params = useParams();
  const navigate = useNavigate();
  const { products, isLoading, error } = useProducts(
    "https://humber-capstone-backend.herokuapp.com/products"
  );
  useEffect(() => {
    if (products && products.length > 0) {
      setProduct(products.find((p) => p._id === params.id));
    }
  }, [products]);

  return isLoading ? (
    <CircularProgress />
  ) : (
    <>
      <Button
        style={{ marginBottom: 20 }}
        onClick={() => navigate(-1)}
        variant="contained"
        color="primary"
        aria-label="Add"
      >
        <ArrowBackIcon />
        <FormattedMessage id={"Back"} />
      </Button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          padding: 2,
          marginBottom: 2,
        }}
      >
        <div>
          <ProductDetails
            title="General Product Information"
            data={product.product_details}
          />
          <ProductDetails
            title="Product Technical Information"
            data={product.product_tech_details}
          />
          <ProductDetails
            title="Product Environmental Information"
            data={product.product_env_details}
          />
          <ProductDetails
            title="Marking and Documentations"
            data={product.marking_and_doc}
          />
          <ProductDetails
            title="Compliance Reports"
            data={product.compliance_report_number}
          />
        </div>
      </div>
    </>
  );
}

export default ProductInfo;
