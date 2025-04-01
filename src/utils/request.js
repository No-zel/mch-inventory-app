const options = {
    baseUrl: "http://192.168.100.9:5001/mch/v1",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  
  class APIRequest {
    async get({ url, headersOption }) {
      try {
        const response = await fetch(`${options.baseUrl}${url}`, {
          method: "GET",
          headers: {
            ...headersOption,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        return { response: response, data: json };
      } catch (err) {
        console.error(err);
        return { response: err, data: null };
      }
    }
  
    async post({ url, bodyObj, headersOption }) {
      try {
        const response = await fetch(`${options.baseUrl}${url}`, {
          method: "POST",
          headers: {
            ...headersOption,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...bodyObj,
          }),
        });
        const json = await response.json();
        return { response: response, data: json };
      } catch (err) {
        console.error(err);
        return null;
      }
    }
  
    async patch({ url, bodyObj, headersOption}) {
      try {
        const response = await fetch(`${options.baseUrl}${url}`, {
          method: "PATCH",
          headers: {
            ...headersOption,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...bodyObj,
          }),
        });
        const json = await response.json();
        return { response: response, data: json };
      } catch (err) {
        console.error(err);
      }
    }
  }
  
  export { options, APIRequest };