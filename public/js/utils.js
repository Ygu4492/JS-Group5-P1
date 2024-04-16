/**
 * Common methods for Adv JavaScript group project
 * Must be loaded after JQuery
 * @author ygu4492@consetogac.on.ca
 */

// define an easy get function
const get = async (url, params = {}, options = {}) => {
  const queryString = Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");
  let apiUrl = url;
  if (queryString) {
    apiUrl = `${url}?${queryString}`;
  }
  const res = await fetch(apiUrl, options);
  if (!res.ok) {
    console.error("Network response was not ok");
  }
  return await res.json();
};

// define an easy post function
const post = async (url, data, options = {}) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      ...options,
    });
    if (!res.ok) {
      console.error("Failed request!");
    }
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

const showMessage = {
  message: ({ success, message }, options) => {
    const heading = success ? "Successful!" : "Error!";
    const icon = success ? "success" : "error";
    $.toast({
      heading,
      text: message,
      icon,
      position: "bottom-right",
      ...options,
    });
  },
  success: (message, options) => {
    $.toast({
      heading: "Successful!",
      text: message,
      icon: "success",
      position: "bottom-right",
      ...options,
    });
  },
  error: (message, options) => {
    $.toast({
      heading: "Error!",
      text: message,
      icon: "error",
      position: "bottom-right",
      hideAfter: 5000,
      ...options,
    });
  },
  info: (message, options) => {
    $.toast({
      heading: "Information!",
      text: message,
      icon: "info",
      position: "bottom-right",
      hideAfter: 5000,
      ...options,
    });
  },
  warning: (message, options) => {
    $.toast({
      heading: "Warning!",
      text: message,
      icon: "warning",
      position: "bottom-right",
      hideAfter: 5000,
      ...options,
    });
  },
};

function getUrlParams(url = window.location.href) {
  var params = {};

  url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (match, key, value) {
    params[key] = decodeURIComponent(value);
  });

  return params;
}

ygu4492 = {
  showMessage,
  get,
  post,
  getUrlParams,
};
