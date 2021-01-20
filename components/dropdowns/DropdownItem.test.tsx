import React from 'react'
import { shallow } from 'enzyme'
import DropdownItem from './DropdownItem'

describe('DropdownItem rendering tests', () => {
  it('should render properly', () => {
    const wrapper = shallow(<DropdownItem />)
    expect(wrapper).toMatchSnapshot()
  })
})