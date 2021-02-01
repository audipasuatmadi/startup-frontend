import { isRegisterErrorResponse, isRegisterSuccessResponse, isUserDataType } from './userTypes';

describe('userTypes type guards tests', () => {
  it('should detects error response correctly', () => {
    const dummyErrorResponse = {
      isAxiosError: true,
      response: {data: {
        otherMessage: 'other message error'
      }}
    }

    expect(isRegisterErrorResponse(dummyErrorResponse)).toBe(true)
  })

  it('should detects success response correctly', () => {
    const dummyErrorResponse = {
      status: 201,
      data: {
        accessToken: 'a',
        refreshToken: 'a',
        name: 'a',
        username: 'a'
      }
    }

    expect(isRegisterSuccessResponse(dummyErrorResponse)).toBe(true)
  })

  it('should detect a user data type', () => {
    const userDataType = {
      name: 'a',
      username: 'a'
    }

    expect(isUserDataType(userDataType)).toBe(true)

  })


})