export const serverHost = "http://localhost:5000/api";

export const uploads = "http://localhost:5000/uploads";

export const generateRequestConfig = (
  method,
  configData,
  configToken = null,
  configImage = null
) => {
  let requestSettings;

  if (configImage) {
    requestSettings = {
      method,
      body: configData,
      headers: {},
    };
  } else if (method === "DELETE" || configData === null) {
    requestSettings = {
      method,
      headers: {},
    };
  } else {
    requestSettings = {
      method,
      body: JSON.stringify(configData),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  if (configToken) {
    requestSettings.headers.Authorization = `Bearer ${configToken}`;
  }

  return requestSettings;
};
