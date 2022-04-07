import React from "react";
import AutocompleteInput from "../../Input/AutocompleteInput";
import RadioTextInput from "../../Input/RadioTextInput";
import SupplyConnInput from "../../Input/SupplyConnInput";
import TextInput from "../../Input/TextInput";
import CheckboxInput from "../../Input/CheckboxInput";
import TextSizeInput from "../../Input/TextSizeInput";

function ProductTechnicalInfo({ editContent }) {
  const options = [
    {
      name: "Ordinary person",
      isChecked: editContent
        ? editContent["use_classification"].includes("Ordinary person")
          ? true
          : false
        : false,
    },
    {
      name: "Children likely present",
      isChecked: editContent
        ? editContent["use_classification"].includes("Children likely present")
          ? true
          : false
        : false,
    },
    {
      name: "Instructed person",
      isChecked: editContent
        ? editContent["use_classification"].includes("Instructed person")
          ? true
          : false
        : false,
    },
    {
      name: "Skilled person",
      isChecked: editContent
        ? editContent["use_classification"].includes("Skilled person")
          ? true
          : false
        : false,
    },
  ];
  const rating = ["Voltage", "Phase", "Frequency", "Power", "Current"];
  const supply = [
    {
      name: "AC mains",
      isChecked: editContent
        ? editContent["supply_connection"].includes("AC mains")
          ? true
          : false
        : false,
    },
    {
      name: "DC mains",
      isChecked: editContent
        ? editContent["supply_connection"].includes("DC mains")
          ? true
          : false
        : false,
    },
    {
      name: "Battery Powered",
      isChecked: editContent
        ? editContent["supply_connection"].includes("Battery Powered")
          ? true
          : false
        : false,
    },
  ];
  const supplCon = [
    {
      category: "Pluggable equipment type A",
      values: [
        {
          name: "Non-detachable Supply Cord",
          isChecked: editContent
            ? editContent["supply_connection_type"].includes(
                "Non-detachable Supply Cord"
              )
              ? true
              : false
            : false,
        },
        {
          name: "Appliance Coupler",
          isChecked: editContent
            ? editContent["supply_connection_type"].includes(
                "Appliance Coupler"
              )
              ? true
              : false
            : false,
        },
        {
          name: "Direct plug-in",
          isChecked: editContent
            ? editContent["supply_connection_type"].includes("Direct plug-in")
              ? true
              : false
            : false,
        },
      ],
    },
    {
      category: "Pluggable equipment type B",
      values: [
        {
          name: "Non-detachable Supply Cord B",
          isChecked: editContent
            ? editContent["supply_connection_type"].includes(
                "Non-detachable Supply Cord B"
              )
              ? true
              : false
            : false,
        },
        {
          name: "Appliance Coupler B",
          isChecked: editContent
            ? editContent["supply_connection_type"].includes(
                "Appliance Coupler B"
              )
              ? true
              : false
            : false,
        },
      ],
    },
    {
      category: "Other types",
      values: [
        {
          name: "Permanent connection",
          isChecked: editContent
            ? editContent["supply_connection_type"].includes(
                "Permanent connection"
              )
              ? true
              : false
            : false,
        },
        {
          name: "Mating connector",
          isChecked: editContent
            ? editContent["supply_connection_type"].includes("Mating connector")
              ? true
              : false
            : false,
        },
      ],
    },
  ];
  const opmode = [
    {
      name: "Continuos",
      isChecked: editContent
        ? editContent.operation_mode.selected_mode
          ? true
          : false
        : false,
    },
    {
      name: "Duty Cycle",
      isChecked: editContent
        ? editContent.operation_mode.selected_mode
          ? true
          : false
        : false,
    },
  ];
  const eqmob = [
    {
      name: "Movable",
      isChecked: editContent
        ? editContent["mobility"].includes("Movable")
          ? true
          : false
        : false,
    },
    {
      name: "Hand-held",
      isChecked: editContent
        ? editContent["mobility"].includes("Hand-held")
          ? true
          : false
        : false,
    },
    {
      name: "Transportable",
      isChecked: editContent
        ? editContent["mobility"].includes("Transportable")
          ? true
          : false
        : false,
    },
    {
      name: "Direct plug-in",
      isChecked: editContent
        ? editContent["mobility"].includes("Direct plug-in")
          ? true
          : false
        : false,
    },
    {
      name: "Stationary for building-in",
      isChecked: editContent
        ? editContent["mobility"].includes("Stationary for building-in")
          ? true
          : false
        : false,
    },
    {
      name: "Wall/ceiling-mounted SRME/rack-mounted",
      isChecked: editContent
        ? editContent["mobility"].includes(
            "Wall/ceiling-mounted SRME/rack-mounted"
          )
          ? true
          : false
        : false,
    },
    {
      name: "Other",
      isChecked: editContent
        ? editContent["mobility"].includes("Other")
          ? true
          : false
        : false,
    },
  ];

  return (
    <>
      <TextSizeInput
        required={false}
        label="Overall Size of Equipment (W x D x H)"
        placeholder="Enter Size"
        name="equipment_size"
        editContent={editContent}
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
        editContent={editContent}
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
