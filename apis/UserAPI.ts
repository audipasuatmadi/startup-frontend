import axios from "./Index"
import { AxiosError, AxiosResponse } from "axios"
import { UserRegisterSuccessData, UserRegisterErrorData, UserCredentials } from "../lib/user/userTypes";



export default {
  async register(userCredentials: UserCredentials) {
    let status: AxiosResponse<UserRegisterSuccessData> | AxiosError<UserRegisterErrorData>;

    try {
      status = await axios.post('/users', userCredentials).then((registerResponse: AxiosResponse<UserRegisterSuccessData>) => registerResponse)
    } catch (e) {
      status = e as AxiosError<UserRegisterErrorData>
    }
    return status
  }
}