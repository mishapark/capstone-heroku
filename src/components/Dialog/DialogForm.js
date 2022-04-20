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
import ComplianceReports from "./AddProductSections/ComplianceReports";
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

function DialogForm({ title, standards, countries, compliances, editContent }) {
  const [expanded, setExpanded] = useState(true);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const renderForm = (title) => {
    switch (title) {
      case "General Product Information":
        return (
          <GeneralProductInfo
            standards={standards}
            countries={countries}
            editContent={editContent && editContent["product_details"]}
          />
        );
      case "Product Technical Information":
        return (
          <ProductTechnicalInfo
            editContent={editContent && editContent["product_tech_details"]}
          />
        );
      case "Product Environmental Information":
        return (
          <ProductEnvironInfo
            editContent={editContent && editContent["product_env_details"]}
          />
        );
      case "Marking and Documentations":
        return (
          <MarkingDoc
            editContent={editContent && editContent["marking_and_doc"]}
          />
        );
      case "Compliance Reports":
        return (
          <ComplianceReports
            compliances={compliances}
            editContent={editContent && editContent["compliance_report_number"]}
          />
        );
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
        <FormattedMessage id={title} />
      </AccordionSummary>
      <AccordionDetails>
        <div style={styles.inputs}>{renderForm(title)}</div>
      </AccordionDetails>
    </Accordion>
  );
}

export default DialogForm;
