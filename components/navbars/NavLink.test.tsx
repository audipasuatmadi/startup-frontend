import React from 'react';
import { shallow } from 'enzyme';
import NavLink from './NavLink';
import { useRouter } from 'next/router';

jest.mock('next/router');

describe('NavLink rendering tests', () => {
  let mockedUseRouter: jest.Mock;

  beforeEach(() => {
    mockedUseRouter = useRouter as jest.Mock;
  });

  afterEach(() => {
    mockedUseRouter.mockClear();
  });

  it('should render correctly if current route does not match', () => {
    mockedUseRouter.mockReturnValue({ pathname: '/aboutus' });

    const wrapper = shallow(
      <NavLink href='/home' activeClassName='bg-red-900'>
        <a className='test'>Dummy Children</a>
      </NavLink>
    );

    expect(mockedUseRouter).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly if current route does match', () => {
    mockedUseRouter.mockReturnValue({ pathname: '/home' });

    const wrapper = shallow(
      <NavLink href='/home' activeClassName='bg-red-900'>
        <a className='test '>Dummy Children</a>
      </NavLink>
    );

    expect(mockedUseRouter).toHaveBeenCalled();
    expect(wrapper.find('a').prop('className').split(' ')[2]).toMatch(
      'bg-red-900'
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correcly if current route is a children of the main route', () => {
    mockedUseRouter.mockReturnValue({ pathname: '/home/subroute' });

    const wrapper = shallow(
      <NavLink href='/home' activeClassName='bg-red-900'>
        <a className='test '>Dummy Children</a>
      </NavLink>
    );

    expect(mockedUseRouter).toHaveBeenCalled();
    expect(wrapper.find('a').prop('className').split(' ')[2]).toMatch(
      'bg-red-900'
    );
    expect(wrapper).toMatchSnapshot();
  });
});
