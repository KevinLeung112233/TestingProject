import axios from "axios";

let BASE_URL = `https://itunes.apple.com/hk`;

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
  withCredentials: true
});

const fetchUrl = (method, endpoint, params = {}) => {
  return instance[method](endpoint, params);
};

const api = {
  init(s) {
    store = s;
  },
  get(endpoint, params) {
    return fetchUrl("get", endpoint, params);
  },
  post(endpoint, params) {
    return fetchUrl("post", endpoint, params);
  },
  put(endpoint, params) {
    return fetchUrl("put", endpoint, params);
  },
  patch(endpoint, params) {
    return fetchUrl("patch", endpoint, params);
  },
  delete(endpoint, params) {
    return fetchUrl("delete", endpoint, params);
  }
};

export default api;