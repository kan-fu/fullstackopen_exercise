import React from "react";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  const baseStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    border: "5px solid",
    padding: 10,
    marginBottom: 10,
  };

  if (message.type === "success") {
    baseStyle.color = "green";
  }

  return (
    <div style={baseStyle} className="message">
      {message.message}
    </div>
  );
};

export default Notification;
