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
  const { search, ...filters } = options;
  const conditions = [];
  if (search) {
    conditions.push({
      $or: searchableFields.map(field => ({
        [field]: {
          $regex: search,
          $options: 'i',
        },
      })),
    });
  }
  if (Object.keys(filters).length) {
    const filterConditions: { [field: string]: string | Record<string, unknown> } = {};

    Object.entries(filters).forEach(([field, value]) => {
      // if (field === 'publicationYear') {
      //   filterConditions[field] = value;
      // } else{
      //   filterConditions[field] = {
      //     $regex: value,
      //     $options: 'i',
      //   };
      // }  
      filterConditions[field] = value;
    });
    if (Object.keys(filterConditions).length) {
      conditions.push({
        $and: [filterConditions],
      });
    }
  }
  return conditions.length > 0 ? { $and: conditions } : {};
};
