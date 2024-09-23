import axios from "axios";
import qs from "qs";

const instance = axios.create({
  baseURL: "",
  timeout: 30000,
  headers: {},
});

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";

instance.interceptors.response.use(
  function (response) {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);

export function post(url, params, headers) {
  return new Promise((resolve, reject) => {
    instance
      .post(url, qs.stringify(params), headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
