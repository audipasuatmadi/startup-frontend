import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Navbar from './Navbar';
import { useSelector } from 'react-redux';
import { UserData } from '../../lib/user/userTypes';
import { getLocalStorageData } from '../../lib/utils/LocalStorageUtil';

jest.mock('react-redux');
jest.mock('../../lib/utils/LocalStorageUtil.ts');
describe('Navbar rendering tests', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Navbar />);
  });

  afterEach(() => {
    if (wrapper) wrapper.unmount();
  });

  it('should render the main components correctly', () => {
    expect(wrapper.find('Link').find('a').exists()).toBe(true);
    expect(wrapper.find('TextField').exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the right buttons when user is logged in', () => {
    expect(wrapper.find('NavigationItem').length).toBe(5);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render properly if userdata is logged in', () => {
    const mockedUseSelector = useSelector as jest.Mock;
    const dummyLoggedUser: UserData = {
      name: 'John Doe',
      username: 'johndoe',
    };

    mockedUseSelector.mockReturnValue(dummyLoggedUser);
    expect(mockedUseSelector).toHaveBeenCalled();
    expect(mockedUseSelector).toHaveReturned();
  });
});
