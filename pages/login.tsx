import React, { useReducer } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import TextField from '../components/inputfields/TextField';
import IconButton from '../components/buttons/IconButton';
import Button from '../components/buttons/Button';
import { onEnterFocusToNextElement } from '../lib/utils/TextFieldUtil';
import { useFormik } from 'formik';
import { UserLoginRequestData } from '../lib/user/userTypes';
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../lib/user/UserActions';
import { RootState } from '../states/RootReducer';
import Modal from '../components/modals/Modal';
import ClipLoader from 'react-spinners/ClipLoader'

const login = () => {
  const [showPassword, toggleShowPassword] = useReducer(
    (state) => !state,
    false
  );

  const dispatch = useDispatch()
  const userDataState = useSelector((state: RootState) => state.userData)
  const loginErrorState = useSelector((state: RootState) => state.loginError)


  const initialValues: UserLoginRequestData = {
    username: '',
    password: ''
  }

  const validationSchema: Yup.SchemaOf<UserLoginRequestData> = Yup.object().shape({
    username: Yup.string().required('username harus diisi'),
    password: Yup.string().required('password harus diisi')
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (loginRequestBody) => {
      dispatch(loginUser(loginRequestBody))
    }
  })

  return (
    <div className='w-full, lg:px-64'>
      <Head>
        <title>Login | Elites Bible</title>
      </Head>

      {userDataState === 'loading' && (
        <Modal isLabelOnly>
          <ClipLoader color='#fff' loading size={150} />
        </Modal>
      )}

      <div className='container pt-32 md:pt-44 mx-auto px-6 flex flex-col md:flex-row'>
        <div className='w-full flex flex-col items-center'>
          <Image
            src='/assets/svgs/art-workout.svg'
            alt='workout image'
            width={400}
            height={400}
          />
        </div>
        <div className='w-full'>
          <h5 className='text-lg font-bold'>Login</h5>
          <p className='text-gray-400 text-sm'>selamat datang kembali</p>

          <form className='mt-4'
            onSubmit={(e) => {
              e.preventDefault();

              if (userDataState === 'loading') return;

              formik.handleSubmit(e)
            }}
            autoComplete='off'
          >
            <TextField
              id='username'
              name='username'
              type='text'
              labelText='username'
              className='w-full'
              solid
              onKeyPress={onEnterFocusToNextElement()}
              error={
                (formik.errors.username && true) || (loginErrorState.username && true)
              }
              helperText ={
                formik.errors.username || loginErrorState.username
              }
              onChange={(e) => {
                e.target.value = e.target.value.toLowerCase().trim();
                formik.handleChange(e);
              }}
            />

            <TextField
              id='password'
              name='password'
              type={showPassword ? 'text' : 'password'}
              labelText='password'
              className='w-full'
              solid
              onKeyPress={onEnterFocusToNextElement(2)}
              error={(formik.errors.password && true) || (loginErrorState.password && true)}
              helperText={formik.errors.password || loginErrorState.password}
              trailingIcon={
                <IconButton
                  type='button'
                  onClick={toggleShowPassword}
                  icon={
                    <Image
                      src='/assets/svgs/ic-eye.svg'
                      width={20}
                      height={20}
                    />
                  }
                />
              }
              onChange={formik.handleChange}
            />

            <p className='text-red-500 mt-4'>
              {loginErrorState.otherMessage}
            </p>

            <Button className='mt-4 w-full' type='submit'>
              Login
            </Button>
            <Link href='/register'>
              <a className='block text-center mb-8'>belum memiliki akun</a>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default login;
