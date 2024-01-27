import { requestApi } from "../utils/ApiRequest";

export const userLogin = async (userData) => {
  return await requestApi("POST", 'users/login', userData);
}

export const userSignUp = async(userData) => {
  return await requestApi("POST", 'users', userData);
}

export const userInfo = async () => {
  return await requestApi("GET", 'users/me');
}

export const userLogout = async () => {
  return await requestApi("GET", 'users/logout')
}