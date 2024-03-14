import React from "react";

function ErrorComponent({ message }) {
  return (
    <div role="alert" className="alert alert-error  animate-bounce mt-5 rounded-md p-3 ">
      <span className="text-left  ">{message}</span>
    </div>
  );
}

export default ErrorComponent;
