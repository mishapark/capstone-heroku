import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import Input from "../Input/Input";
import {
  generalProdInfo,
  prodTechInfo,
  prodEnvInfo,
  markingDoc,
} from "../../constants/inputs";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = {
  inputs: {
    display: "grid",
    columnGap: 20,
    gridTemplateColumns: "50% 50%",
    padding: 20,
    width: "100%",
  },
  summary: {
    flexDirection: "row-reverse",
  },
};

function DialogForm({ title }) {
  const [expanded, setExpanded] = React.useState(true);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const renderInputs = () => {
    switch (title) {
      case "General Product Information":
        return generalProdInfo.map((input) => (
          <Input
            key={input.id}
            label={input.field}
            type={input.type}
            required={input.required}
            options={input.options}
            optional={input.optional}
            placeholder={input.placeholder}
          />
        ));
      case "Product Technical Information":
        return prodTechInfo.map((input) => (
          <Input
            key={input.id}
            label={input.field}
            type={input.type}
            required={input.required}
            options={input.options}
            optional={input.optional}
            placeholder={input.placeholder}
          />
        ));
      case "Product Environmental Information":
        return prodEnvInfo.map((input) => (
          <Input
            key={input.id}
            label={input.field}
            type={input.type}
            required={input.required}
            options={input.options}
            optional={input.optional}
            placeholder={input.placeholder}
          />
        ));
      case "Marking and Documentations":
        return markingDoc.map((input) => (
          <Input
            key={input.id}
            label={input.field}
            type={input.type}
            required={input.required}
            options={input.options}
            optional={input.optional}
            placeholder={input.placeholder}
            uploadLabel={input.uploadLabel}
          />
        ));
      default:
        break;
    }
  };

  return (
    <Accordion expanded={expanded} onChange={handleChange(!expanded)}>
      <AccordionSummary
        style={styles.summary}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        {title}
      </AccordionSummary>
      <AccordionDetails>
        <div style={styles.inputs}>{renderInputs()}</div>
      </AccordionDetails>
    </Accordion>
  );
}

export default DialogForm;
