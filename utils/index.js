export const displayFormError = (errors, field) => {
  return errors[field]
    ? { content: errors[field].message, pointing: "above" }
    : false;
};

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://deployment-url.now.sh"
    : "http://localhost:3000";

export const catchErrors = (error, displayError) => {
  let errorMsg;
  if (error.response) {
    errorMsg = error.response.data;
    console.error("Error response", errorMsg);
  } else if (error.request) {
    // The request was made, but no response was received
    errorMsg = error.request;
    console.error("Error response", errorMsg);
  } else {
    // Something else happened in making the request that triggered an error
    errorMsg = error.message;
    console.error("Error message", errorMsg);
  }
  displayError(errorMsg);
};
