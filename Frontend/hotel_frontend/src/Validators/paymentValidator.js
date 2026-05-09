export const validatePayment = ({
  cardNumber,
  holderName,
  expiryDate,
  cvv,
}) => {
  if (cardNumber.replace(/\s/g, "").length < 16) {
    return "Invalid card number";
  }

  if (!holderName.trim()) {
    return "Enter card holder name";
  }

  if (expiryDate.length !== 5) {
    return "Invalid expiry date";
  }

  if (cvv.length < 3) {
    return "Invalid CVV";
  }

  return null;
};