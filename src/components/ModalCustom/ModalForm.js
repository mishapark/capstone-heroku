import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import Input from "../Input/Input";
import inputs from "../../constants/inputs";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = {
  inputs: {
    display: "grid",
    gridTemplateColumns: "50% 50%",
    padding: 20,
  },
  summary: {
    flexDirection: "row-reverse",
  },
};

function ModalForm({ title }) {
  const [expanded, setExpanded] = React.useState("panel");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <Accordion expanded={expanded === "panel"} onChange={handleChange("panel")}>
      <AccordionSummary
        style={styles.summary}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        {title}
      </AccordionSummary>
      <AccordionDetails>
        <div style={styles.inputs}>
          {inputs.map((input) => (
            <Input
              key={input.id}
              label={input.field}
              type={input.type}
              required={input.required}
              radioOptions={input.radioOptions}
              optional={input.optional}
            />
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

export default ModalForm;
