const useProduct = (data) => {
  let product = {
    product_details: {
      regulatory_model_name: data.regulatory_model_name,
      product_name: data.product_name,
      product_family: data.product_family,
      product_category: data.product_category,
      product_description: data.product_description,
      model_difference: data.model_difference,
      intended_environment: data.intended_environment,
      applicable_standards: data.applicable_standards,
      applicant: {
        name: data.applicant.split(",")[0],
        address: data.applicant.split(",")[1],
      },
      manufacturer: [
        // {
        //   name: str,
        //   address: str,
        //   phone_number: str,
        // },
      ],
      trade_mark: {
        status: data.trade_mark,
        data: [],
      },
      family_series_model: [data.family_series_model],
      market: [
        // {
        //   continent_code: data.,
        //   continent_name: data.,
        //   country_code: data.,
        //   country_name: data.,
        // },
      ],
    },
    product_tech_details: {
      equipment_size: {
        width: data.equipment_size.split(/X|x/)[0],
        length: data.equipment_size.split(/X|x/)[1],
        height: data.equipment_size.split(/X|x/)[2],
        unit: data.equipment_size_unit,
      },
      equipment_weight: 0,
      power_rating: {
        voltage: 0,
        phase: 0,
        frequency: 0,
        power: 0,
        current: 0,
      },
      operation_mode: {
        selected_mode: data.operation_mode, // “Continuous”/”Duty Cycle”
        ratio: 0, // this is for when Duty Cycle is selected
      },
      use_classification: [data.use_classification],
      supply_connection: [],
      mobility: [],
    },
    marking_and_doc: {
      marking_plate: [],
      warning_mark: [],
    },
  };

  return product;
};

export default useProduct;
