import React from "react";
import errorImg from "../../assets/images/error-img.jpg";
const Error = () => {
  return (
    <div className="error__container">
      <img src={errorImg} alt="" className="error" />
    </div>
  );
};

export default Error;
