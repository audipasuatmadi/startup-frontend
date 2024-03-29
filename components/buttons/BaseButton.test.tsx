import React from 'react'
import { shallow } from 'enzyme'
import BaseButton from './BaseButton'

describe('BaseButton functionality tests', () => {
  it('should clickable if not disabled', () => {
    const mockFunction = jest.fn()
    const secondMockFunction = jest.fn();
    const wrapper = shallow(<BaseButton onClick={mockFunction} onMouseDown={secondMockFunction} />)
    
    wrapper.find('button').simulate('click')
    wrapper.find('button').simulate('mousedown')
    expect(mockFunction).toHaveBeenCalled()
    expect(secondMockFunction).toHaveBeenCalled()
    wrapper.find('button').simulate('click')
    wrapper.find('button').simulate('mousedown')
    expect(mockFunction).toHaveBeenCalledTimes(2)
    expect(secondMockFunction).toHaveBeenCalledTimes(2)
  });

  it('should be not clickable if disabled', () => {
    const mockFunction = jest.fn()
    const wrapper = shallow(<BaseButton disabled onClick={mockFunction} onMouseDown={mockFunction} />)
    
    wrapper.find('button').simulate('click')
    expect(mockFunction).not.toHaveBeenCalled()
  })
})

describe('BaseButton rendering tests', () => {
  it('should render properly as a button without args', () => {
    const wrapper = shallow(<BaseButton />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render properly as a button when disabled, even with a href', () => {
    const wrapper = shallow(<BaseButton disabled href="/home" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render properly as a link, with href args without disabled', () => {
    const wrapper = shallow(<BaseButton href="/home" />)
    expect(wrapper).toMatchSnapshot()
  })

})