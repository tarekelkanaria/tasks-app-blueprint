import { useCallback, useState } from "react";
import axios from "axios";

const useRequest = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  const sendRequest = useCallback(async (requestConfig, dealWithData) => {
    setIsError(false);
    try {
      setIsLoading(true);
      const responseData = await axios[`${requestConfig.method}`](
        requestConfig.url,
        requestConfig.task ? { text: requestConfig.task } : null,
        {
          headers: requestConfig.headers ? requestConfig.headers : {},
        }
      ).then((response) => response.data);
      dealWithData ? dealWithData(responseData) : null;
    } catch (error) {
      setIsError(true);
      setErrorText(error.message);
    }
    setIsLoading(false);
  }, []);

  return { isError, isLoading, errorText, sendRequest };
};

export default useRequest;
