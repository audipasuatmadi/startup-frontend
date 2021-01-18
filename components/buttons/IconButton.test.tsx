import React from 'react'
import { ShallowWrapper, shallow } from 'enzyme';
import IconButton, { IconButtonProps } from './IconButton';
import Image from 'next/image'

const baseProps: IconButtonProps = {
  icon: <Image src="/assets/svgs/ic-search.svg" height={32} width={32} />,
};

describe('icon button rendering tests', () => {
  let wrapper: ShallowWrapper;
  let props: IconButtonProps;

  const renderComponent = (props: IconButtonProps) => <IconButton {...props} />;

  afterEach(() => {
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  beforeEach(() => {
    props = baseProps;
  });

  it('renders correctly without props', () => {
    wrapper = shallow(renderComponent(props));
  });

  it('renders correctly as a Link', () => {
    props = { ...props, href: '/' };
    wrapper = shallow(renderComponent(props));
  });

  it('renders correctly when disabled', () => {
    props = { ...props, disabled: true };
    wrapper = shallow(renderComponent(props));
  });

  it('renders correctly as a Link when disabled', () => {
    props = { ...props, disabled: true, href: '/' };
    wrapper = shallow(renderComponent(props));
  });
});
