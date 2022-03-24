import React from "react";
import AutocompleteInput from "../../Input/AutocompleteInput";
import RadioTextInput from "../../Input/RadioTextInput";
import SupplyConnInput from "../../Input/SupplyConnInput";
import TextInput from "../../Input/TextInput";
import CheckboxInput from "../../Input/CheckboxInput";
import TextSizeInput from "../../Input/TextSizeInput";

function ProductTechnicalInfo() {
  const options = [
    "Ordinary person",
    "Children likely present",
    "Instructed person",
    "Skilled person",
  ];
  const rating = ["Voltage", "Phase", "Frequency", "Power", "Current"];
  const supply = ["AC mains", "DC mains", "Battery Powered"];
  const supplCon = [
    {
      category: "Pluggable equipment type A",
      values: [
        "Non-detachable Supply Cord",
        "Appliance Coupler",
        "Direct plug-in",
      ],
    },
    {
      category: "Pluggable equipment type B",
      values: ["Non-detachable Supply Cord", "Appliance Coupler"],
    },
    {
      category: "Other types",
      values: ["Permanent connection", "Mating connector "],
    },
  ];
  const opmode = ["Continuons", "Duty Cycle"];
  const eqmob = [
    "Movable",
    "Hand-held",
    "Transportable",
    "Direct plug-in",
    "Stationary for building-in",
    "Wall/ceiling-mounted SRME/rack-mounted",
    "Other",
  ];

  return (
    <>
      <TextSizeInput
        required={false}
        label="Overall Size of Equipment (W x D x H)"
        placeholder="Enter Size"
        name="equipment_size"
      />
      <AutocompleteInput
        required={false}
        label="Power Rating/Electrical Rating"
        placeholder="Select Rating"
        options={rating}
        name="power_rating"
      />
      <RadioTextInput
        required={false}
        label="Operation Mode"
        options={opmode}
        name="operation_mode"
        textName="ratio"
      />
      <CheckboxInput
        required={false}
        label="Classification of use by"
        placeholder="Select Classification"
        options={options}
        name="use_classification"
      />
      <CheckboxInput
        required={false}
        label="Supply Connection"
        placeholder="Select Supply Connection"
        options={supply}
        name="supply_connection"
      />
      <SupplyConnInput
        required={false}
        label="Supply Connection – Type"
        placeholder="Select Type"
        options={supplCon}
        name="supply_connection_type"
      />
      <CheckboxInput
        required={false}
        label="Equipment Mobility"
        placeholder="Select Equipment Mobility"
        options={eqmob}
        name="mobility"
      />
    </>
  );
}

export default ProductTechnicalInfo;
