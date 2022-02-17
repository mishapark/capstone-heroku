import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import GeneralProductInfo from "./AddProductSections/GeneralProductInfo";
import ProductTechnicalInfo from "./AddProductSections/ProductTechnicalInfo";
import ProductEnvironInfo from "./AddProductSections/ProductEnvironInfo";
import MarkingDoc from "./AddProductSections/MarkingDoc";
const styles = {
  inputs: {
    display: "flex",
    flexWrap: "Wrap",
    margin: "0 -10px -10px 0",
    padding: 20,
    width: "100%",
  },
  summary: {
    flexDirection: "row-reverse",
  },
};

function DialogForm({ title, standards, countries }) {
  const [expanded, setExpanded] = useState(true);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const renderForm = () => {
    switch (title) {
      case "General Product Information":
        return (
          <GeneralProductInfo standards={standards} countries={countries} />
        );
      case "Product Technical Information":
        return <ProductTechnicalInfo />;
      case "Product Environmental Information":
        return <ProductEnvironInfo />;
      case "Marking and Documentations":
        return <MarkingDoc />;
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
        <div style={styles.inputs}>{renderForm()}</div>
      </AccordionDetails>
    </Accordion>
  );
}

export default DialogForm;
