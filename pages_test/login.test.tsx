import React from 'react';
import Login from '../pages/login';
import { shallow, ShallowWrapper } from 'enzyme';

describe('login page rendering tests', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Login />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render 2 credentials fields', () => {
    expect(wrapper.find('TextField').length).toBe(2);
    expect(wrapper.find('TextField').first().prop('id')).toMatch('username');
  });

  it('should render 2 credentials fields with the right id & name', () => {
    const firstTextField = wrapper.find('TextField').first();
    const secondTextField = wrapper.find('TextField').last();

    expect(firstTextField.prop('id')).toMatch('username');
    expect(secondTextField.prop('id')).toMatch('password');

    expect(firstTextField.prop('name')).toMatch('username');
    expect(secondTextField.prop('name')).toMatch('password');
  });

  it('should have a button to submit the credentials', () => {
    expect(wrapper.find('Button').length).toBe(1)
    expect(wrapper.find('Button').prop('type')).toMatch('submit')
  })
});
