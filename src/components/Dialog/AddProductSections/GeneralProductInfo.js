import React, { useState } from "react";
import CategoryInput from "../../Input/CategoryInput";
import ApplicableStandardsInput from "../../Input/ApplicableStandardsInput";
import TextInput from "../../Input/TextInput";
import CheckboxInput from "../../Input/CheckboxInput";
import TextExtraInput from "../../Input/TextExtraInput";
import RadioUpload from "../../Input/RadioUpload";
import CountriesInput from "../../Input/CountriesInput";

const countriess = ["Russia", "Canada", "China", "Korea", "India", "Kongo"];

function GeneralProductInfo({ standards, countries }) {
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState([]);

  // if (countries.length > 0) {
  //   setCountry(countries.map((c) => c.name.common));
  // }

  return (
    <>
      <TextInput
        required={false}
        label="Regulatory Model Name"
        placeholder="Enter Model Name"
        name="regulatory_model_name"
      />
      <TextInput
        required={true}
        label="Product Name"
        placeholder="Enter Product Name"
        name="product_name"
      />
      <TextInput
        required={true}
        label="Regulatory Family"
        placeholder="Enter Product Family"
        name="product_family"
      />
      <CategoryInput
        required={true}
        label="Product Category"
        placeholder="Enter Product Category"
        standards={standards}
        onCategoryChange={(value) => setCategory(value)}
        name="product_category"
      />
      <TextInput
        required={false}
        label="Product Description / Intended Use"
        placeholder="Enter Product Description / Intended Use"
        name="product_description"
      />
      <TextInput
        required={false}
        label="Model Difference (if applicable)"
        placeholder="Enter Model Difference"
        name="model_difference"
      />
      <CheckboxInput
        required={true}
        label="Intended Environment"
        options={["Household", "Commercial", "Clinical"]}
        name="intended_environment"
      />
      <ApplicableStandardsInput
        required={true}
        label="Applicable Standards"
        options={standards}
        category={category}
        name="applicable_standards"
      />
      <TextInput
        required={false}
        label="Applicant Name and Address"
        placeholder="Enter Applicant Name and Address"
        name="applicant"
      />
      <TextExtraInput
        required={false}
        label="Manufacturer Name and Address"
        placeholder="Enter Name and Address"
        name="manufacturer"
      />
      <RadioUpload
        required={false}
        label="TradeMark"
        options={["Yes", "No"]}
        name="trade_mark"
      />
      <TextExtraInput
        required={false}
        label="Family/Series Model"
        placeholder="Enter Family/Series Model"
        name="family_series_model"
      />
      <CountriesInput
        required={false}
        label="Market"
        placeholder="Select a country"
        options={countries.map((c) => c.name.common)}
        name="market"
      />
    </>
  );
}

export default GeneralProductInfo;
