import axios from "axios";

const API_URL = "https://localhost:7098/api/authentication/";

export function register(username: string, email: string, password: string, confirmPassword: string) {
  return axios.post(API_URL + "register", {
    username,
    email,
    password,
    confirmPassword
  });
}

export function login(username: string, password: string) {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      return response.data;
    });
}

export function logout() {
  localStorage.removeItem("user");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function loginWithGoogle(credential : any) {
  return axios
    .post(API_URL + "google-response", {credential: credential})
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      return response.data;
    });
}

export function getCurrentUser() {
  const userStr = localStorage.getItem("user");
  if (userStr)
    return JSON.parse(userStr);

  return null;
}