import React, { useReducer } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import TextField from '../components/inputfields/TextField'
import IconButton from '../components/buttons/IconButton'
import Button from '../components/buttons/Button'
import { onEnterFocusToNextElement } from '../lib/utils/TextFieldUtil'


const login = () => {


  const [showPassword, toggleShowPassword] = useReducer(state => !state, false)

  return (
    <div className='w-full, lg:px-64'>
      <Head>
        <title>Login | Elites Bible</title>
      </Head>

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
          <p className='text-gray-400 text-sm'>
            selamat datang kembali
          </p>

          <form className='mt-4'>
            <TextField 
              id='username'
              name='username'
              type='text'
              labelText='username'
              className='w-full'
              solid
              onKeyPress={onEnterFocusToNextElement()}
            />

            <TextField
              id='password'
              name='password'
              type={showPassword? 'text' : 'password'}
              labelText='password'
              className='w-full'
              solid
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
            
            <p className='text-red-500 mt-4'>

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
  )
}

export default login
