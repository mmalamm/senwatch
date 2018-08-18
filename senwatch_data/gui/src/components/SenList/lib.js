export const getPartyClass = party => {
  switch (party) {
    case "D":
      return "Democratic";
    case "R":
      return "Republican";
    default:
      return "Other";
  }
};
