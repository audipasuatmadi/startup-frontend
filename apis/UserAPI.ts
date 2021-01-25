import axios from "./Index"
import { AxiosError, AxiosResponse } from "axios"
import { UserAPIErrorResponse } from "../lib/user/userTypes";

export interface UserCredentials {
  name: string
  username: string
  password: string
}

export interface UserData {
  name: string
  username: string
  profilePicURL?: string
}

export default {
  async register(userCredentials: UserCredentials) {
    let status: number | UserAPIErrorResponse;

    try {
      status = await axios.post('/users', userCredentials).then((registerResponse: AxiosResponse) => registerResponse.status)
    } catch (e) {
      const error = e as AxiosError
      if (error.response) {
        status = {errorData: error.response.data, errorStatus: error.response.status}
      } else {
        status = 500
      }
    }
    return status
  }
}