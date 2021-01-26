import React from 'react'
import Modal from "./Modal";
import { shallow } from 'enzyme';

describe('Modal render tests', () => {
  it('should render properly', () => {
    const wrapper = shallow(<Modal><p>hello world!</p></Modal>)
    expect(wrapper.find('p').exists()).toBe(true)
    expect(wrapper).toMatchSnapshot()
  })
})