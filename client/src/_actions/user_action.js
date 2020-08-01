import { LOGIN_USER, REGISTER_USER } from "./type";
import axios from "axios";

export function loginUser(reciveSubmitData) {
  const request = axios
    .post("/api/users/login", reciveSubmitData)
    .then((res) => res.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(reciveSubmitData) {
  const request = axios
    .post("/api/users/register", reciveSubmitData)
    .then((res) => res.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}
