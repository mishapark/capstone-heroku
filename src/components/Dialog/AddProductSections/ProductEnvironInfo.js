import React from "react";
import CheckboxInput from "../../Input/CheckboxInput";
import RadioInput from "../../Input/RadioInput";
import TextCelciusInput from "../../Input/TextCelciusInput";
import TextInput from "../../Input/TextInput";
import TextNumDecInput from "../../Input/TextNumDecInput";
import TextNumX from "../../Input/TextNumX";

function ProductEnvironInfo({ editContent }) {
  const options = [
    {
      name: "P1",
    },
    {
      name: "P2",
    },
    {
      name: "P3",
    },
  ];

  return (
    <>
      <RadioInput
        required={false}
        label="Pollution Degree"
        placeholder="Enter Pollution Degree"
        options={options}
        name="pollution_degree"
        editContent={editContent}
      />
      <TextCelciusInput
        required={false}
        label="Manufacturer Specific Max Operating Ambient"
        placeholder="Enter Ambient"
        name="max_operating_ambient"
        editContent={editContent}
      />
      <TextNumX
        required={false}
        label="Ingree Protection Classification"
        placeholder="Enter Classification"
        name="ingree_protection_classification"
        editContent={editContent}
      />
      <TextInput
        required={false}
        label="Altitude During Operation"
        placeholder="Enter Altitude"
        name="operation_altitude"
        editContent={editContent}
      />
      <TextNumDecInput
        required={false}
        label="Mass Of Equipment (in kg)"
        placeholder="Enter Mass"
        name="equipment_mass"
        editContent={editContent}
      />
      <TextInput
        required={false}
        label="Relative Humidity (%)"
        placeholder="Enter Humidity"
        name="relative_humidity"
        editContent={editContent}
      />
      <TextInput
        required={false}
        label="Atmospheric Pressure [kPa]"
        placeholder="Enter Pressure"
        name="atmospheric_pressure"
        editContent={editContent}
      />
      <CheckboxInput
        required={false}
        label="Indoor or Outdoor"
        options={[
          {
            name: "Indoor",
            isChecked: editContent
              ? editContent.indoor_outdoor.includes("Indoor")
                ? true
                : false
              : false,
          },
          {
            name: "Outdoor",
            isChecked: editContent
              ? editContent.indoor_outdoor.includes("Outdoor")
                ? true
                : false
              : false,
          },
        ]}
        name="indoor_outdoor"
        editContent={editContent}
      />
    </>
  );
}

export default ProductEnvironInfo;
