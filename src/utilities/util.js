export const handleRequestError = (objToCheck, dispatch, callbackFn) => {
  // catch way logic
  if (
    objToCheck.response &&
    objToCheck.response.data &&
    (objToCheck.response.data.error || objToCheck.response.data.errors)
  ) {
    const errors = objToCheck.response.data.error
      ? [objToCheck.response.data.error]
      : objToCheck.response.data.errors;
    callbackFn(errors, dispatch);
    return false;
  } else if (
    objToCheck.data &&
    !objToCheck.data.success &&
    (objToCheck.data.error || objToCheck.data.errors)
  ) {
    const errors = objToCheck.data.error
      ? [objToCheck.data.error]
      : objToCheck.data.errors;
    callbackFn(errors, dispatch);
    return false;
  } else if (objToCheck.message) {
    callbackFn(['Something wrong happened'], dispatch);
    return false;
  } else if(!objToCheck.status && !objToCheck.response) {
    callbackFn(["We couldn't connect to the server"], dispatch);
  }
  return true;
};
