const getErrorMessage = (error, fallbackMessage = "Something went wrong") => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  if (error?.message) {
    return error.message;
  }
  return fallbackMessage;
};

export default getErrorMessage;
