import React from "react";
import "./Main.css";
const CustomButton = ({
  onClick,
  title,
  color,
  fontSize,
  width,
  textColor,
}) => {
  const height = window.innerHeight;
  const heightiPhone6s = height <= 667;

  const buttonHeight = heightiPhone6s ? 35 : 45;
  const buttonFontSize = heightiPhone6s
    ? fontSize
      ? fontSize - 3
      : 14
    : fontSize || 18;

  const defaultColor = color || "#333"; // Reemplaza con tu Constants.LGREEN si querés
  const defalutTextColor = textColor || "#fff";
  return (
    <button
      onClick={onClick}
      style={{
        margin: "10px",
        width: width || "250px",
        height: `${buttonHeight}px`,
        borderRadius: "50px",
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: defaultColor,
        boxShadow: "6px 8px 8px rgba(0, 0, 0, 1)",
        cursor: "pointer",
        fontSize: `${buttonFontSize}px`,
        fontWeight: "bold",
        color: defalutTextColor,
        textAlign: "center",
        fontFamily: "Roboto-Regular",
      }}
    >
      {title}
    </button>
  );
};

export default CustomButton;
