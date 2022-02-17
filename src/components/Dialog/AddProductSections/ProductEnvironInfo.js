import React from "react";
import CheckboxInput from "../../Input/CheckboxInput";
import RadioInput from "../../Input/RadioInput";
import TextCelciusInput from "../../Input/TextCelciusInput";
import TextInput from "../../Input/TextInput";
import TextNumDecInput from "../../Input/TextNumDecInput";
import TextNumX from "../../Input/TextNumX";

function ProductEnvironInfo() {
  const options = ["PD1", "PD2", "PD3"];

  return (
    <>
      <RadioInput
        required={false}
        label="Polution Degree"
        placeholder="Enter Polution Degree"
        options={options}
        name="pollution_degree"
      />
      <TextCelciusInput
        required={false}
        label="Manufacturer Specific Max Operating Ambient"
        placeholder="Enter Ambient"
        name="max_operating_ambient"
      />
      <TextNumX
        required={false}
        label="Ingree Protection Classification"
        placeholder="Enter Classification"
        name="ingree_protection_classification"
      />
      <TextInput
        required={false}
        label="Altitude During Operation"
        placeholder="Enter Altitude"
        name="operation_altitude"
      />
      <TextNumDecInput
        required={false}
        label="Mass Of Equipment (in kg)"
        placeholder="Enter Mass"
        name="equipment_mass"
      />
      <TextInput
        required={false}
        label="Relative Humidity (%)"
        placeholder="Enter Humidity"
        name="relative_humidity"
      />
      <TextInput
        required={false}
        label="Atmospheric Pressure [kPa]"
        placeholder="Enter Pressure"
        name="atmospheric_pressure"
      />
      <CheckboxInput
        required={false}
        label="Indoor or Outdoor"
        options={["Indoor", "Outdoor"]}
        name="indoor_outdoor"
      />
    </>
  );
}

export default ProductEnvironInfo;
