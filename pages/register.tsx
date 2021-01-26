import React, { useReducer } from 'react';
import Head from 'next/head';
import { useFormik } from 'formik';
import { UserRegisterForm } from '../lib/user/userTypes';
import TextField from '../components/inputfields/TextField';
import Button from '../components/buttons/Button';
import Link from 'next/link';
import Image from 'next/image';
import IconButton from '../components/buttons/IconButton';
import * as Yup from 'yup';
import { onEnterFocusToNextElement } from '../lib/utils/TextFieldUtil';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../lib/user/UserActions';
import { RootState } from '../states/RootReducer';
import ClipLoader from 'react-spinners/ClipLoader';
import Modal from '../components/modals/Modal';

const register = () => {
  const [showPassword, toggleShowPassword] = useReducer(
    (state) => !state,
    false
  );
  const [showPasswordConfirm, toggleShowPasswordConfirm] = useReducer(
    (state) => !state,
    false
  );

  const dispatch = useDispatch();
  const userDataIsLoading = useSelector(
    (rootState: RootState) => rootState.userData
  );
  const errorOccuredInRegistering = useSelector(
    (rootState: RootState) => rootState.registerError
  );

  const initialValues: UserRegisterForm = {
    name: '',
    username: '',
    password: '',
    passwordConfirm: '',
  };

  const validationSchema: Yup.SchemaOf<UserRegisterForm> = Yup.object().shape({
    name: Yup.string().required('nama harus disii'),
    username: Yup.string().required('username harus diisi'),
    password: Yup.string().required('password harus diisi'),
    passwordConfirm: Yup.string()
      .required('konfirmasi password harus diisi')
      .oneOf(
        [Yup.ref('password')],
        'konfirmasi password harus sama dengan password'
      ),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: ({ name, username, password }) => {
      dispatch(registerUser({ name, username, password }));
    },
  });

  return (
    <div className='w-full lg:px-64'>
      <Head>
        <title>Registrasi | Elites Bible</title>
      </Head>

      {userDataIsLoading === 'loading' && (
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
          <h5 className='text-lg font-bold'>Bergabung</h5>
          <p className='text-gray-400 text-sm'>
            bergabung bersama 0 user lainnya (wkwk) dan menjadi diri yang lebih
            baik
          </p>
          <form
            className='mt-4'
            onSubmit={(e) => {
              e.preventDefault();

              if (userDataIsLoading === 'loading') return;

              formik.handleSubmit(e);
            }}
            autoComplete='off'>
            <TextField
              id='name'
              name='name'
              type='text'
              labelText='nama'
              className='w-full'
              error={
                (formik.errors.name && formik.touched.name) ||
                (errorOccuredInRegistering.name && true)
              }
              helperText={
                (formik.touched.name && formik.errors.name) ||
                errorOccuredInRegistering.name
              }
              solid
              onChange={formik.handleChange}
              onKeyPress={onEnterFocusToNextElement()}
              value={formik.values.name}
            />

            <TextField
              id='username'
              name='username'
              type='text'
              labelText='username'
              className='w-full'
              error={
                (formik.errors.username && formik.touched.username) ||
                (errorOccuredInRegistering.username && true)
              }
              helperText={
                (formik.touched.username && formik.errors.username) ||
                errorOccuredInRegistering.username
              }
              solid
              onKeyPress={onEnterFocusToNextElement()}
              onChange={(e) => {
                e.target.value = e.target.value.toLowerCase().trim();
                formik.handleChange(e);
              }}
              value={formik.values.username}
            />

            <TextField
              id='password'
              name='password'
              type={showPassword ? 'text' : 'password'}
              labelText='password'
              className='w-full'
              solid
              error={
                (formik.errors.password && formik.touched.password) ||
                (errorOccuredInRegistering.password && true)
              }
              helperText={
                (formik.touched.password && formik.errors.password) ||
                errorOccuredInRegistering.password
              }
              onChange={formik.handleChange}
              value={formik.values.password}
              onKeyPress={onEnterFocusToNextElement(2)}
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
            />

            <TextField
              id='passwordConfirm'
              name='passwordConfirm'
              type={showPasswordConfirm ? 'text' : 'password'}
              labelText='konfirmasi password'
              className='w-full'
              solid
              onKeyPress={onEnterFocusToNextElement(2)}
              error={
                formik.errors.passwordConfirm && formik.touched.passwordConfirm
              }
              helperText={
                formik.touched.passwordConfirm && formik.errors.passwordConfirm
              }
              onChange={formik.handleChange}
              value={formik.values.passwordConfirm}
              trailingIcon={
                <IconButton
                  onClick={toggleShowPasswordConfirm}
                  type='button'
                  icon={
                    <Image
                      src='/assets/svgs/ic-eye.svg'
                      width={20}
                      height={20}
                    />
                  }
                />
              }
            />

            <p className='text-red-500 mt-4'>
              {errorOccuredInRegistering.otherMessage}
            </p>

            <Button className='mt-4 w-full' type='submit'>
              Bergabung
            </Button>
            <Link href='/login'>
              <a className='block text-center mb-8'>sudah memiliki akun</a>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default register;
