import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import Button from '../buttons/Button';
import Dropdown from './Dropdown';
import DropdownItem from './DropdownItem';

describe('dropdown component render tests', () => {
  it('should render correctly without childrens, shallowy', () => {
    const wrapper: ShallowWrapper = shallow(
      <Dropdown
        togglerRender={(props) => <Button {...props}>Test Button</Button>}
      />
    );

    expect(wrapper.find('Button').first().exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with childrens, shallowy', () => {
    const component: JSX.Element = (
      <Dropdown
        togglerRender={(props) => <Button {...props}>Test Button</Button>}>
        <DropdownItem>Item 1</DropdownItem>
        <DropdownItem>Item 2</DropdownItem>
        <DropdownItem>Item 3</DropdownItem>
      </Dropdown>
    );

    const wrapper: ShallowWrapper = shallow(component);

    expect(wrapper.find('Button').first().exists()).toBe(true);
    expect(wrapper.find('DropdownItem').length).toEqual(3);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with childrens disabled, shallowy', () => {
    const component: JSX.Element = (
      <Dropdown
        togglerRender={(props) => <Button {...props}>Test Button</Button>}>
        <DropdownItem disabled onClick={() => {}}>
          Item 1
        </DropdownItem>
        <DropdownItem disabled>Item 2</DropdownItem>
        <DropdownItem>Item 3</DropdownItem>
      </Dropdown>
    );

    const wrapper: ShallowWrapper = shallow(component);

    expect(wrapper.find('Button').first().exists()).toBe(true);
    expect(wrapper.find('DropdownItem').length).toEqual(3);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with childrens, opened', () => {
    const component: JSX.Element = (
      <Dropdown
        togglerRender={(props) => <Button {...props}>Test Button</Button>}>
        <DropdownItem>Item 1</DropdownItem>
        <DropdownItem>Item 2</DropdownItem>
        <DropdownItem>Item 3</DropdownItem>
      </Dropdown>
    );

    const wrapper: ShallowWrapper = shallow(component);

    expect(wrapper.find('Button').first().exists()).toBe(true);
    wrapper.find('Button').simulate('click');

    expect(wrapper.find('DropdownItem').length).toEqual(3);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('dropdown component functionality test', () => {
  let testValue = false;

  const setTestValue = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    testValue = true;
  };

  beforeEach(() => {
    testValue = false;
  });

  it('should have DropdownItem and able to be clicked', () => {
    const component: JSX.Element = (
      <Dropdown
        togglerRender={(props) => <Button {...props}>Test Button</Button>}>
        <DropdownItem onClick={setTestValue}>Item 1</DropdownItem>
        <DropdownItem>Item 2</DropdownItem>
        <DropdownItem>Item 3</DropdownItem>
      </Dropdown>
    );

    const wrapper: ShallowWrapper = shallow(component);

    wrapper.find('DropdownItem').first().simulate('click');
    expect(testValue).toBe(true);
  });
});
