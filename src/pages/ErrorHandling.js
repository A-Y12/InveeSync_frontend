import React from "react";

const ErrorHandling = ({ errors }) => {
  return (
    <div>
      <h1>Error Handling</h1>
      {errors.map((error, index) => (
        <div key={index}>
          <h2>Section: {error.section}</h2>
          <ul>
            {error.messages.map((message, i) => (
              <li key={i}>{message}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ErrorHandling;
