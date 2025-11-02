import React from "react";

const Container = (props) => {
  return (
    <div
      className={`w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 ${props.className}`}
    >
      {props.children}
    </div>
  );
};

export default Container;
