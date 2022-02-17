import React from "react";
import RadioInput from "../../Input/RadioInput";
import TextInput from "../../Input/TextInput";
import UploadInput from "../../Input/UploadInput";

function MarkingDoc() {
  return (
    <>
      <UploadInput
        required={false}
        label="Copy of Marking Plate"
        uploadLabel="copy-or-marking-plate"
        name="marking_plate"
      />
      <UploadInput
        required={false}
        label="Warning/Cautionary Marking"
        uploadLabel="warning-cautionary-marking"
        name="warning_mark"
      />
      <RadioInput
        required={false}
        label="Polution Degree"
        placeholder="Enter Polution Degree"
        options={["Replaceable", "Non-Replaceable", "None"]}
        name="polution_degree"
      />
      <TextInput
        required={false}
        label="Fuse Marking"
        placeholder="Enter Fuse Marking"
        name="fuse_type"
      />
    </>
  );
}

export default MarkingDoc;
