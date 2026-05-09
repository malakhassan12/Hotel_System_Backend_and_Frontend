const getRatingLabel = (rating) => {
  switch (rating) {
    case 5:
      return { text: "Excellent", color: "green" };
    case 4:
      return { text: "Very Good", color: "blue" };
    case 3:
      return { text: "Good", color: "yellow" };
    case 2:
      return { text: "Average", color: "orange" };
    case 1:
      return { text: "Poor", color: "red" };
    default:
      return { text: "Unknown", color: "gray" };
  }
};

export default getRatingLabel;
