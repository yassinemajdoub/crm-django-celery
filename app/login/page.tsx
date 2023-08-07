import React from 'react';
import Link from 'next/link';
import LoginForm from '../components/forms/LoginForm';

const Login = () => {
  return (
    <>
       <h1 className="text-center text-2xl text-black font-light">Login</h1>
       <div className="flex justify-center mt-5">
                <div className="w-full max-w-sm">

                <LoginForm />
                
                <p className='mt-10 text-center text-sm text-gray-500'>
                    Don&apos;t have an account?{' '}
					<Link
						href='/register'
						className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
					>
						Register here
					</Link>
				</p>
                </div>
            </div>    
    </>
  );
};

export default Login;
