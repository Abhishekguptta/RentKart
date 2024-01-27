import { userInfo, userLogin, userSignUp } from "../apis/user";

export const useGetInfo = async () => {
  const {data} = await userInfo()
  return data;
}

export const useLoginInUser = async (userData) => {
  const {data} = await userLogin(userData)
  return data;
}

export const useSignUpUser = async (userData) => {
  const {data} = await userSignUp(userData)
  return data;
}
