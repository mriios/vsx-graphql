const monthNumberToNameShort = (monthNumber: number) => {
  const date = new Date();
  date.setMonth(monthNumber);

  return date.toLocaleString("en-US", {
    month: "short"
  });
};

export default monthNumberToNameShort;
