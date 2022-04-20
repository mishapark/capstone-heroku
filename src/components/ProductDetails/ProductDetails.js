import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ProductEntries from "./ProductEntries";
import { FormattedMessage } from "react-intl";

const styles = {
  inputs: {
    display: "flex",
    flexWrap: "wrap",
    padding: 20,
    width: "100%",
  },
  summary: {
    flexDirection: "row-reverse",
  },
};

function ProductDetails({ title, data }) {
  const [expanded, setExpanded] = useState(true);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <Accordion expanded={expanded} onChange={handleChange(!expanded)}>
      <AccordionSummary
        style={styles.summary}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <FormattedMessage id={title} />
      </AccordionSummary>
      <AccordionDetails>
        <div style={styles.inputs}>
          {data && <ProductEntries title={title} data={data} />}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

export default ProductDetails;
