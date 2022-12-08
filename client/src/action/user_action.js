import axios from "axios"
import { USER_LOGIN, USER_REGISTER, USER_AUTH } from "./user_type"


export const userLogin = (data) => {
  const request = axios.post("api/users/login", data)
  .then(response => response.data)

  return {
    type: USER_LOGIN,
    payload : request
  }
}

export const userRegister = (data) => {
  const request = axios.post("api/users/register", data)
  .then(response => response.data)

  return {
    type: USER_REGISTER,
    payload : request
  }
}

export const userAuth = () => {
  const request = axios.get("api/users/auth")
  .then(response => response.data)

  return {
    type : USER_AUTH,
    payload : request
  }
}