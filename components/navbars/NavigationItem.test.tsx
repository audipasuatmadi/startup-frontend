import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import Button from '../buttons/Button';
import NavigationItem from './NavigationItem';


describe('navigationitem rendering tests', () => {
  it('should render other component correctly', () => {
    const wrapper: ShallowWrapper = shallow(
      <NavigationItem>
        <Button>hello</Button>
      </NavigationItem>
    );
    expect(wrapper.find('Button').exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
});
