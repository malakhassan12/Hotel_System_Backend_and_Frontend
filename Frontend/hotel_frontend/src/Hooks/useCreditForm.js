
import { useState } from "react";

const useCreditCardForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [holderName, setHolderName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleCardNumber = (value) => {
    const formatted = value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();

    setCardNumber(formatted);
  };

  const handleExpiry = (value) => {
    let formatted = value.replace(/\D/g, "");

    if (formatted.length >= 3) {
      formatted =
        formatted.slice(0, 2) + "/" + formatted.slice(2, 4);
    }

    setExpiryDate(formatted);
  };

  const handleCVV = (value) => {
    setCvv(value.replace(/\D/g, ""));
  };

  return {
    cardNumber,
    holderName,
    expiryDate,
    cvv,
    setHolderName,
    handleCardNumber,
    handleExpiry,
    handleCVV,
  };
};

export default useCreditCardForm;