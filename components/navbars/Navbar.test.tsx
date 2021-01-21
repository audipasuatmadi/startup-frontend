import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Navbar from './Navbar';

describe('Navbar rendering tests', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Navbar />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render the main components correctly', () => {
    expect(wrapper.find('Link').find('a').exists()).toBe(true);
    expect(wrapper.find('TextField').exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the right buttons when user is not logged out', () => {
    expect(wrapper.find('NavigationItem').length).toBe(5);
    expect(wrapper).toMatchSnapshot();
  });
});
