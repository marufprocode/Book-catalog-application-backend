type conditionType = {
  $or?: { [field: string]: { $regex: string; $options: string } }[];
  $and?: { [field: string]: string | number | Record<string, unknown> }[];
}[];

interface returnType {
  $and?: conditionType;
}

export const getSearchAndFiltersCondition = (
  options: { [Type: string]: string },
  searchableFields: string[]
): returnType => {
  const { searchTerm, ...filters } = options;
  const conditions = [];
  if (searchTerm) {
    conditions.push({
      $or: searchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  if (Object.keys(filters).length) {
    const filterConditions: { [field: string]: string | Record<string, unknown> } = {};

    Object.entries(filters).forEach(([field, value]) => {
      if (field === 'minPrice') {
        filterConditions.price = {
          ...((filterConditions.price as unknown) || {}),
          $gte: parseInt(value, 10),
        };
      } else if (field === 'maxPrice') {
        filterConditions.price = {
          ...((filterConditions.price as unknown) || {}),
          $lte: parseInt(value, 10),
        };
      } else {
        filterConditions[field] = {
          $regex: value,
          $options: 'i',
        };
      }
    });

    if (Object.keys(filterConditions).length) {
      conditions.push({
        $and: [filterConditions],
      });
    }
  }
  return conditions.length > 0 ? { $and: conditions } : {};
};
