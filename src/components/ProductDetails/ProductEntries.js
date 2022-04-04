import React from "react";
import { InputLabel } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import AttachFileIcon from "@mui/icons-material/AttachFile";

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
              <div>
                {data.regulatory_model_name
                  ? data.regulatory_model_name
                  : " - "}
              </div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>Product Name</InputLabel>
              <div>{data.product_name ? data.product_name : " - "}</div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>Regulatory Family</InputLabel>
              <div>{data.product_family ? data.product_family : " - "}</div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>Product Category</InputLabel>
              <div>{data.product_category ? data.product_category : " - "}</div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>
                Product Description / Intended Use
              </InputLabel>
              <div>
                {data.product_description ? data.product_description : " - "}
              </div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>Model Difference</InputLabel>
              <div>{data.model_difference ? data.model_difference : " - "}</div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>Intended Environment</InputLabel>
              <div>
                {data.intended_environment
                  ? data.intended_environment.join(", ")
                  : " - "}
              </div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>Applicable Standards</InputLabel>
              <div>
                {data.applicable_standard ? data.applicable_standard : " - "}
              </div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>
                Applicant Name and Address
              </InputLabel>
              <div>{data.applicant.name ? data.applicant.name : " - "}</div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>
                Manufacturer Name and Address
              </InputLabel>
              <div>
                {data.manufacturer[0].name ? data.manufacturer[0].name : " - "}{" "}
                {data.manufacturer[0].address}
              </div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>TradeMark</InputLabel>
              <div>{data.trade_mark.status === true ? "Yes" : "No"}</div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>Family/Series Model</InputLabel>
              <div>
                {data.family_series_model[0]
                  ? data.family_series_model[0].text
                  : " - "}
              </div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>Market</InputLabel>
              <div>
                {data.market[0].country_name !== ""
                  ? data.market.map((c) => c.country_name).join(", ")
                  : " - "}
              </div>
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
              <div>{`W: ${
                data.equipment_size.width ? data.equipment_size.width : " - "
              } L: ${
                data.equipment_size.length ? data.equipment_size.length : " - "
              } H: ${
                data.equipment_size.height ? data.equipment_size.height : " - "
              } Unit: ${
                data.equipment_size.unit ? data.equipment_size.unit : " - "
              }`}</div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>
                Power Rating/Electrical Rating
              </InputLabel>
              <div>{}</div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>Operation Mode</InputLabel>
              <div>{`${
                data.operation_mode.selected_mode
                  ? data.operation_mode.selected_mode
                  : " - "
              } ${
                data.operation_mode.ratio ? data.operation_mode.ratio : ""
              }`}</div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>
                Classification of use by
              </InputLabel>
              <div>
                {data.use_classification[0] !== "false"
                  ? data.use_classification.join(", ")
                  : " - "}
              </div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>Supply Connection</InputLabel>
              <div>
                {data.supply_connection[0] !== "false"
                  ? data.supply_connection.join(", ")
                  : " - "}
              </div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>
                Supply Connection – Type
              </InputLabel>
              <div>
                {data.supply_connection_type.length !== 0
                  ? data.supply_connection_type.join(", ")
                  : " - "}
              </div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>Equipment Mobility</InputLabel>
              <div>
                {data.mobility[0] !== "false"
                  ? data.mobility.join(", ")
                  : " - "}
              </div>
            </div>
          </>
        );
      case "Product Environmental Information":
        return (
          <>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>Pollution Degree</InputLabel>
              <div>{data.pollution_degree ? data.pollution_degree : " - "}</div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>
                Manufacturer Specific Max Operating Ambient
              </InputLabel>
              <div>
                {data.max_operating_ambient
                  ? parseFloat(data.max_operating_ambient)
                  : " - "}
              </div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>
                Ingree Protection Classification
              </InputLabel>
              <div>
                {data.ingree_protection_classification
                  ? data.ingree_protection_classification
                  : " - "}
              </div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>
                Altitude During Operation
              </InputLabel>
              <div>
                {data.operation_altitude
                  ? parseFloat(data.operation_altitude)
                  : " - "}
              </div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>
                Mass Of Equipment (in kg)
              </InputLabel>
              <div>
                {data.equipment_mass ? parseFloat(data.equipment_mass) : " - "}
              </div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>Relative Humidity (%)</InputLabel>
              <div>
                {data.relative_humidity
                  ? parseFloat(data.relative_humidity)
                  : " - "}
              </div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>
                Atmospheric Pressure [kPa]
              </InputLabel>
              <div>
                {data.atmospheric_pressure
                  ? parseFloat(data.atmospheric_pressure)
                  : " - "}
              </div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>Indoor or Outdoor</InputLabel>
              <div>
                {data.indoor_outdoor !== "false" ? data.indoor_outdoor : " - "}
              </div>
            </div>
          </>
        );
      case "Marking and Documentations":
        return (
          <>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>Copy of Marking Plate</InputLabel>
              <div>
                {data.marking_plate.length !== 0
                  ? data.marking_plate.map((file) => (
                      <Typography key={file.name}>
                        <AttachFileIcon />
                        <a
                          href={`https://humber-capstone-backend.herokuapp.com/files/${file.file_location}`}
                          target="_blank"
                        >
                          {file.name}
                        </a>
                      </Typography>
                    ))
                  : " - "}
              </div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>
                Warning/Cautionary Marking
              </InputLabel>
              <div>
                {data.warning_mark.length !== 0
                  ? data.warning_mark.map((file) => (
                      <Typography key={file.name}>
                        <AttachFileIcon />
                        <a
                          href={`https://humber-capstone-backend.herokuapp.com/files/${file.file_location}`}
                          target="_blank"
                        >
                          {file.name}
                        </a>
                      </Typography>
                    ))
                  : " - "}
              </div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>Fuse Type</InputLabel>
              <div>{data.fuse_type ? data.fuse_type : " - "}</div>
            </div>
            <div style={styles.element}>
              <InputLabel style={styles.mb10}>Fuse Marking</InputLabel>
              <div>{data.fuse_marking !== "" ? data.fuse_marking : " - "}</div>
            </div>
          </>
        );
      case "Compliance Reports":
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
