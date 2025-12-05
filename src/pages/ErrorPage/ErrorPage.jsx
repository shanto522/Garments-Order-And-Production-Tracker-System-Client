import React from "react";
import errorImg from "../../assets/errorImg.jpg";
const ErrorPage = () => {
  return (
    <div>
      <main className="min-h-screen flex justify-center items-center">
        <img src={errorImg} alt="" />
      </main>
    </div>
  );
};

export default ErrorPage;
