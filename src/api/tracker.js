// import axios from "axios";

// export default axios.create({
//   baseURL: "http://81ec-154-127-124-234.ngrok.io",
// });

// The commented block below is a basic use of axios (I can apply it to almost all projects)
// The implemented one below is just another way of doing things

import axios from "axios";
import { AsyncStorage } from "react-native";

const instance = axios.create({
  baseURL: "http://81ec-154-127-124-234.ngrok.io",
});

// Inside the use method: The first method will be called automatically anytime we are about to make a request,
// the second function is going to be called automatically anytime that there is an error with making that request(if we don't have
// internet connection for example)
instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
