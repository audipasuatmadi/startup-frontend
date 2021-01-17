import React from 'react'
import { ShallowWrapper, shallow } from 'enzyme';
import Button from './Button';

const dummyText = 'test text';

describe('button rendering test', () => {
  let wrapper: ShallowWrapper;
  afterEach(() => {
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders correctly without args & no theme', () => {
    wrapper = shallow(<Button />);
  });

  it('renders correctly as a Link', () => {
    wrapper = shallow(<Button href='/' />);
  });

  it('renders correctly when disabled', () => {
    wrapper = shallow(<Button disabled />);
  });

  it('renders correctly as a Link when disabled', () => {
    wrapper = shallow(<Button disabled href='/' />);
  });

  it('renders correctly with a children', () => {
    wrapper = shallow(<Button>{dummyText}</Button>);
  });

  it('renders correctly as a Link with a children', () => {
    wrapper = shallow(<Button href='/'>{dummyText}</Button>);
  });

  it('renders correctly with brand theme', () => {
    wrapper = shallow(<Button theme='brand' />);
  });

  it('renders correctly when rounded', () => {
    wrapper = shallow(<Button rounded />);
  });
});