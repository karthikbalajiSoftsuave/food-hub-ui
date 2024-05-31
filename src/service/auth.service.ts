import { Tlogin, Tregister } from "../interface/auth.interface";
import BaseService from "./base.service";
import { APIENDPOINTS } from "../utils/endpoints";

export const login = async (payload: Tlogin) => {
  try {
    const { data } = await BaseService.post(APIENDPOINTS.AUTH.LOGIN, payload);
    return data;
  } catch (err) {
    throw err;
  }
};

export const register = async (payload: Tregister) => {
  try {
    const {confirmPassword, ...rest} = payload
    const res = await BaseService.post(APIENDPOINTS.AUTH.REGISTER, rest);
    return res;
  } catch (err) {
    throw err;
  }
};
