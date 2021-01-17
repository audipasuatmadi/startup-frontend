import React from 'react';
import { shallow, ShallowWrapper, mount } from 'enzyme';
import Navbar from './Navbar';
import { useUserData, UseUserDataReturn } from '../hooks/userHooks';

jest.mock('../hooks/userHooks.tsx');

const dummyLoggedInData: UseUserDataReturn = {
  isLoading: false,
  userData: {
    name: 'John Doe',
    username: 'johndoe',
  },
};

const dummyLoggedOutData: UseUserDataReturn = {
  isLoading: false,
};

const dummyIsLoadingData: UseUserDataReturn = {
  isLoading: true,
};

describe('navbar functionality tests', () => {
  let mockedUseUserData: jest.Mock<UseUserDataReturn>;

  mockedUseUserData = useUserData as jest.Mock<UseUserDataReturn>;

  afterEach(() => {
    mockedUseUserData.mockClear();
  });

  it('should call the useUserData hook properly', () => {
    mockedUseUserData.mockReturnValue({ isLoading: false });

    shallow(<Navbar />);

    expect(useUserData).toBeCalled();
    expect(useUserData).toHaveReturnedWith<UseUserDataReturn>({
      isLoading: false,
    });
  });

  it('should have the right menu for logged out user', () => {
    mockedUseUserData.mockReturnValue(dummyLoggedOutData);

    const wrapper = shallow(<Navbar />);

    expect(useUserData).toHaveReturnedWith<UseUserDataReturn>(
      dummyLoggedOutData
    );
    expect(wrapper.find('Button').length).toBe(3);
    expect(wrapper.find('Menu').length).toBe(1);
  });

  it('should have the right menu on loading user data', () => {
    mockedUseUserData.mockReturnValue(dummyIsLoadingData)

    const wrapper = shallow(<Navbar />);

    expect(useUserData).toHaveReturnedWith<UseUserDataReturn>(dummyIsLoadingData)
    expect(wrapper.find('Button').length).toBe(3)
    expect(wrapper.find('Button').last().prop('disabled')).toEqual(true)
  })

  it('should have the right menu for logged in user', () => {
    mockedUseUserData.mockReturnValue(dummyLoggedInData)

    const wrapper = shallow(<Navbar />);

    expect(useUserData).toHaveReturnedWith<UseUserDataReturn>(dummyLoggedInData)
    expect(wrapper.find('Button').length).toBe(2)
    expect(wrapper.find('Menu').length).toBe(2)

  })
});
