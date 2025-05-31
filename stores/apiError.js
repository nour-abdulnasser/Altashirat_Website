import { defineStore } from "pinia";
// TODO: Override frontend errors??

export const useApiErrorStore = defineStore("api-errors", () => {
  // Error data comes in the form of {message, errors}.
  // I will take them separately from the BE response and fill the store respectively.
  const errorStatus = ref(null);
  const errorMessage = ref(null);
  const fieldErrors = ref(null); // object of arrays
  const errors = ref(null); // use this in validation

  // NTS: This is nicer, better to make setters than grab the refs in the code and change them.
  const setStatus = (statusCode) => {
    errorStatus.value = statusCode;
  };

  const setErrors = (errorResponse) => {
    
    errorMessage.value = errorResponse.message;
    fieldErrors.value = errorResponse.errors;
    
  };

  const clearErrors = () => {
    errorStatus.value = null;
    errorMessage.value = null;
    fieldErrors.value = null;
  };

  return {
    errors,
    errorStatus,
    errorMessage,
    fieldErrors,
    setStatus,
    setErrors,
    clearErrors,
  };
});
