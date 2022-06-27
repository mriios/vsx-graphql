const monthNumberToNameShort = (monthNumber: number): string => {
  const date = new Date();
  date.setMonth(monthNumber);

  return date.toLocaleString("en-US", {
    month: "short"
  });
};

export default monthNumberToNameShort;
