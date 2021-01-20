import React from 'react'
import TextField, { TextFieldProps } from './TextField';
import { ShallowWrapper, shallow } from 'enzyme';

const dummyText = 'txt';

const baseProps: TextFieldProps = {
  id: dummyText,
  labelText: dummyText,
  name: dummyText,
  type: 'text',
  value: '',
};

describe('textfield functionality tests', () => {
  let wrapper: ShallowWrapper;
  let props: TextFieldProps;

  const renderComponent = (props: TextFieldProps) => <TextField {...props} />;
  afterEach(() => {
    wrapper.unmount();
    props = baseProps;
  });

  it('is able to change values & sync with the particular source', () => {
    let myVal = 'hey';

    const handleChangeVal = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      myVal = e.target.value;
    };

    props = { ...baseProps, value: myVal, onChange: handleChangeVal };
    wrapper = shallow(renderComponent(props));
    wrapper.find('input').simulate('change', { target: { value: dummyText } });

    expect(myVal).toMatch(dummyText);
  });

  it('is not able to change values & sync with the particular source if disabled', () => {
    let myVal = 'hey';

    const handleChangeVal = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      myVal = e.target.value;
    };

    props = {
      ...baseProps,
      value: myVal,
      onChange: handleChangeVal,
      disabled: true,
    };
    wrapper = shallow(renderComponent(props));
    wrapper.find('input').simulate('change', { target: { value: dummyText } });

    expect(wrapper.find('input').name()).toBe('input');
    expect(myVal).not.toMatch(dummyText);
  });
});

describe('textfield rendering tests', () => {
  let wrapper: ShallowWrapper;
  let props: TextFieldProps;

  const renderComponent = (props: TextFieldProps) => <TextField {...props} />;
  afterEach(() => {
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
    props = baseProps;
  });

  it('renders correctly with base props', () => {
    wrapper = shallow(renderComponent(baseProps));
  });

  it('renders correctly in the solid state', () => {
    props = { ...baseProps, solid: true };
    wrapper = shallow(renderComponent(props));
  });

  it('renders correctly with helper text', () => {
    props = { ...baseProps, helperText: dummyText };
    wrapper = shallow(renderComponent(props));
  });

  it('renders correctly in the error state', () => {
    props = { ...baseProps, error: true };
    wrapper = shallow(renderComponent(props));
  });

  it('renders correctly in the disabled state', () => {
    props = { ...baseProps, disabled: true };
    wrapper = shallow(renderComponent(props));
  });
});
