import API from "~/axios/config";

export const useApi = () => {
  const isLoading = ref(false); // Done: encapsulate state
  const toggleLoadingFlag = () => (isLoading.value = !isLoading.value);
  const _get = async (endpoint, params = null) => {
    toggleLoadingFlag();
    try {
      const response = await API().get(endpoint, {
        params 
      });
      return response;
    } catch (err) {
      console.error("Error GET from useApi", err);
      throw err;
    } finally {
      toggleLoadingFlag();
    }
  };
  const _post = async (endpoint, data, params = null) => {
    toggleLoadingFlag();
    try {
      const response = await API().post(endpoint, data);
      return response;
    } catch (err) {
      console.error("Error POST from useApi", err);
      throw err;
    } finally {
      toggleLoadingFlag();
    }
  };
  const _delete = async (endpoint) => {
    toggleLoadingFlag();
    try {
      const response = await API().delete(endpoint);
      return response;
    } catch (err) {
      console.error("Error DELETE from useApi", err);
      throw err;
    } finally {
      toggleLoadingFlag();
    }
  };

  return {
    isLoading,
    _get,
    _post,
    _delete,
  };
};
