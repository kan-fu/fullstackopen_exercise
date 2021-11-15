import React from "react";

const Notification = ({message:{ message, type }}) => {
  const baseStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    border: "5px solid",
    padding: 10,
    marginBottom: 10,
  };
  if (type === "success") {
    baseStyle.color = "green";
  }
  if (message === null) {
    return null;
  }
  return (
    <div style={baseStyle} className='message'>
      {message}
    </div>
  );
};

export default Notification;
