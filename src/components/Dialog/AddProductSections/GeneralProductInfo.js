import React, { useState } from "react";
import CategoryInput from "../../Input/CategoryInput";
import ApplicableStandardsInput from "../../Input/ApplicableStandardsInput";
import TextInput from "../../Input/TextInput";
import CheckboxInput from "../../Input/CheckboxInput";
import TextExtraInput from "../../Input/TextExtraInput";
import RadioUpload from "../../Input/RadioUpload";
import CountriesInput from "../../Input/CountriesInput";
import { Controller } from "react-hook-form";

function GeneralProductInfo({ standards, countries, editContent }) {
  const [category, setCategory] = useState("");

  return (
    <>
      <TextInput
        required={false}
        label="Regulatory Model Name"
        placeholder="Enter Model Name"
        name="regulatory_model_name"
        editContent={editContent}
      />
      <TextInput
        required={true}
        label="Product Name"
        placeholder="Enter Product Name"
        name="product_name"
        editContent={editContent}
      />
      <TextInput
        required={true}
        label="Regulatory Family"
        placeholder="Enter Product Family"
        name="product_family"
        editContent={editContent}
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
        editContent={editContent}
      />
      <TextInput
        required={false}
        label="Model Difference (if applicable)"
        placeholder="Enter Model Difference"
        name="model_difference"
        editContent={editContent}
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
        name="applicable_standard"
      />
      <TextInput
        required={false}
        label="Applicant Name and Address"
        placeholder="Enter Applicant Name and Address"
        name="applicant"
        editContent={editContent}
      />
      <Controller
        name="manufacturer"
        render={({ field }) => (
          <TextExtraInput
            required={false}
            label="Manufacturer Name and Address"
            placeholder="Enter Name and Address"
            field={field}
          />
        )}
      />
      <RadioUpload
        required={false}
        label="TradeMark"
        options={["Yes", "No"]}
        name="trade_mark"
      />
      <Controller
        name="family_series_model"
        render={({ field }) => (
          <TextExtraInput
            required={false}
            label="Family/Series Model"
            placeholder="Enter Family/Series Model"
            field={field}
          />
        )}
      />
      <Controller
        name="market"
        render={({ field: { onChange } }) => (
          <CountriesInput
            required={false}
            label="Market"
            placeholder="Select a country"
            options={countries}
            name="market"
            onChange={onChange}
          />
        )}
      />
    </>
  );
}

export default GeneralProductInfo;
