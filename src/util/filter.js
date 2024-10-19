const extremeTypeMap = function (type) {
  let typeMap;
  switch (type) {
    case "DOW":
      typeMap = "谷值";
      break;
    case "TOP":
      typeMap = "峰值";
      break;
    default:
      typeMap = "--";
  }
  return typeMap;
};

export { extremeTypeMap };
