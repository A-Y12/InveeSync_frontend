export const validateMandatoryFields = (data, requiredFields) => {
    const errors = [];
    requiredFields.forEach((field) => {
      if (!data[field]) errors.push(`${field} is required`);
    });
    return errors;
  };
  
  export const validateUniqueCombination = (items, key1, key2) => {
    const duplicates = items.filter(
      (item, index, arr) =>
        arr.findIndex(
          (i) => i[key1] === item[key1] && i[key2] === item[key2]
        ) !== index
    );
    return duplicates.length ? ["Duplicate entries found"] : [];
  };
  
  // Add custom validation functions for BoM, Process Steps, etc.
  