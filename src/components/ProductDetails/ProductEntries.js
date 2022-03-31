import React from "react";
import { InputLabel, TextField } from "@material-ui/core";

const styles = {
  element: { marginBottom: 10, flex: "0 0 25%" },
  mb10: { marginBottom: 10 },
};

function ProductEntries({ title, data }) {
  console.log(data);
  const renderForm = (title) => {
    switch (title) {
      case "General Product Information":
        return (
          <>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>Regulatory Model Name</InputLabel>
              <div>{data.regulatory_model_name}</div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>Product Name</InputLabel>
              <div>{data.product_name}</div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>Regulatory Family</InputLabel>
              <div>{data.product_family}</div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>Product Category</InputLabel>
              <div>{data.product_category}</div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>
                Product Description / Intended Use
              </InputLabel>
              <div>{data.product_description}</div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>Model Difference</InputLabel>
              <div>{data.model_difference}</div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>Intended Environment</InputLabel>
              <div>{data.intended_environment[0]}</div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>Applicable Standards</InputLabel>
              <div>{data.applicable_standard}</div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>
                Applicant Name and Address
              </InputLabel>
              <div>{data.applicant.name}</div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>
                Manufacturer Name and Address
              </InputLabel>
              <div>{data.manufacturer[0].name}</div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>TradeMark</InputLabel>
              <div>{data.trade_mark.status === true ? "Yes" : "No"}</div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>Family/Series Model</InputLabel>
              <div>
                {data.family_series_model[0] &&
                  data.family_series_model[0].text}
              </div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>Market</InputLabel>
              <div>{data.market.map((c) => c.country_name).join(", ")}</div>
            </div>
          </>
        );
      case "Product Technical Information":
        return (
          <>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>
                Overall Size of Equipment (W x D x H)
              </InputLabel>
              <div>{}</div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>
                Power Rating/Electrical Rating
              </InputLabel>
              <div>{}</div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>Operation Mode</InputLabel>
              <div>{}</div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>
                Classification of use by
              </InputLabel>
              <div>{}</div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>Supply Connection</InputLabel>
              <div>{}</div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>
                Supply Connection – Type
              </InputLabel>
              <div>{}</div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>Equipment Mobility</InputLabel>
              <div>{}</div>
            </div>
          </>
        );
      case "Product Environmental Information":
        return (
          <>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>Pollution Degree</InputLabel>
              <div>{}</div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>
                Manufacturer Specific Max Operating Ambient
              </InputLabel>
              <div>{}</div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>
                Ingree Protection Classification
              </InputLabel>
              <div>{}</div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>
                Altitude During Operation
              </InputLabel>
              <div>{}</div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>
                Mass Of Equipment (in kg)
              </InputLabel>
              <div>{}</div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>Relative Humidity (%)</InputLabel>
              <div>{}</div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>
                Atmospheric Pressure [kPa]
              </InputLabel>
              <div>{}</div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>Indoor or Outdoor</InputLabel>
              <div>{}</div>
            </div>
          </>
        );
      case "Marking and Documentations":
        return (
          <>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>Copy of Marking Plate</InputLabel>
              <div>{}</div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>
                Warning/Cautionary Marking
              </InputLabel>
              <div>{}</div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>Fuse Type</InputLabel>
              <div>{}</div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>Fuse Marking</InputLabel>
              <div>{}</div>
            </div>
          </>
        );
      default:
        break;
    }
  };

  return <>{renderForm(title)}</>;
}

export default ProductEntries;
