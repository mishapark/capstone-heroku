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
        label="Fuse Type"
        placeholder="Enter Fuse Type"
        options={["Replaceable", "Non-Replaceable", "None"]}
        name="fuse_type"
      />
      <TextInput
        required={false}
        label="Fuse Marking"
        placeholder="Enter Fuse Marking"
        name="fuse_marking"
      />
    </>
  );
}

export default MarkingDoc;
