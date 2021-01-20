import React from 'react'
import TextButton from './TextButton';
import { ShallowWrapper, shallow } from 'enzyme';

const dummyText = 'dummy text';

describe('text button rendering tests', () => {
  let wrapper: ShallowWrapper;

  const renderComponent = (props?: {}) => <TextButton {...props} />;
  afterEach(() => {
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders correctly without props', () => {
    wrapper = shallow(renderComponent());
  });

  it('renders correctly as a Link', () => {
    wrapper = shallow(renderComponent({ to: '/' }));
  });

  it('renders correctly with a children', () => {
    wrapper = shallow(renderComponent({ children: dummyText }));
  });

  it('renders correctly as a Link with a children', () => {
    wrapper = shallow(renderComponent({ to: '/', children: dummyText }));
  });

  it('renders correctly when disabled', () => {
    wrapper = shallow(renderComponent({ disabled: true }));
  });

  it('renders correctly as a Link when disabled', () => {
    wrapper = shallow(renderComponent({ to: '/', disabled: true }));
  });
});