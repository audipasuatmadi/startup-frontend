import UserAPI, { UserCredentials } from "./UserAPI"
import axios from './Index'
import { AxiosError } from "axios"

jest.mock('./Index.ts')

describe('User Register Tests', () => {
  let mockedRegisterMethod: jest.Mock

  const fakeUserCredential: UserCredentials = {
    name: "John Doe",
    username:" johndoe",
    password: "hashedpassword"
  }

  beforeEach(() => {
    mockedRegisterMethod = axios.post as jest.Mock
  })

  afterEach(() => {
    mockedRegisterMethod.mockClear()
  })

  it('should return a status code if it works', async () => {
    mockedRegisterMethod.mockReturnValue(Promise.resolve({status: 200}))

    const data = await UserAPI.register(fakeUserCredential)
    expect(mockedRegisterMethod).toHaveBeenCalled()
    expect(mockedRegisterMethod).toHaveBeenCalledWith("/users", fakeUserCredential)
    expect(data).toEqual(200)
  })

  it('should return a status code if it doesn\'t works & no data supplied', async () => {
    mockedRegisterMethod.mockReturnValue(Promise.reject(new Error('dummy error')))

    const data = await UserAPI.register(fakeUserCredential)
    expect(mockedRegisterMethod).toHaveBeenCalled()
    expect(mockedRegisterMethod).toHaveBeenCalledWith("/users", fakeUserCredential)
    expect(data).toEqual(500)
  })


  // TODO: implement the data test once you know the backend return data
})