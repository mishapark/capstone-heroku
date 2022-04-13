const useProduct = (data, files) => {
  let product = {
    product_details: {
      regulatory_model_name: data.regulatory_model_name
        ? data.regulatory_model_name
        : "",
      product_name: data.product_name ? data.product_name : "",
      product_family: data.product_family ? data.product_family : "",
      product_category: data.product_category ? data.product_category : "",
      product_description: data.product_description
        ? data.product_description
        : "",
      model_difference: data.model_difference ? data.model_difference : "",
      intended_environment: data.intended_environment
        ? data.intended_environment
        : false,
      applicable_standard: data.applicable_standard
        ? data.applicable_standard
        : "",
      applicant: {
        name: data.applicant ? data.applicant.split(",")[0] : "",
        address: data.applicant ? data.applicant.split(",")[1] : "",
      },
      manufacturer: [
        {
          name: data.manufacturer?.text,
          address: data.manufacturer?.extra_text,
          phone_number: "",
        },
      ],
      trade_mark: {
        status: data.trade_mark === "Yes" ? true : false,
        data: "",
      },
      family_series_model: data.family_series_model
        ? data.family_series_model
        : [""],
      market: data.market ? data.market : null,
    },
    product_tech_details: {
      equipment_size: {
        width: data.equipment_size.split(/X|x/)[0],
        length: data.equipment_size.split(/X|x/)[1],
        height: data.equipment_size.split(/X|x/)[2],
        unit: data.equipment_size_unit,
      },
      equipment_weight: data.equipment_mass,
      power_rating: {
        voltage: data.power_rating?.voltage,
        phase: data.power_rating?.phase,
        frequency: data.power_rating?.frequency,
        power: data.power_rating?.power,
        current: data.power_rating?.current,
      },
      operation_mode: {
        selected_mode: data.operation_mode,
        ratio: parseFloat(data.ratio),
      },
      use_classification: data.use_classification,
      supply_connection: data.supply_connection,
      supply_connection_type: data.supply_connection_type,
      mobility: data.mobility,
    },
    product_env_details: {
      pollution_degree: data.pollution_degree,
      max_operating_ambient: parseFloat(data.max_operating_ambient),
      ingree_protection_classification: data.ingree_protection_classification,
      operation_altitude: parseFloat(data.operation_altitude),
      equipment_mass: parseFloat(data.equipment_mass),
      relative_humidity: parseFloat(data.relative_humidity),
      atmospheric_pressure: parseFloat(data.atmospheric_pressure),
      indoor_outdoor: data.indoor_outdoor && data.indoor_outdoor.join(", "),
    },
    marking_and_doc: {
      marking_plate: files[0].marking_plate,
      warning_mark: files[1].warning_mark,
      fuse_type: data.fuse_type,
      fuse_marking: data.fuse_marking,
    },
    compliance_report_number: [""],
    last_updated_status: {
      last_updated_by: "",
      last_updated_date: new Date(),
      active_standard: "",
    },
  };

  return product;
};

export default useProduct;
