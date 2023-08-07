import React from 'react';
import Link from 'next/link';
import RegisterForm from '../components/forms/Registerform';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Full Auth | Register',
	description: 'Full Auth register page',
};

export default function Page() {
	return (
    <>
       <h1 className="text-center text-2xl text-black font-light">Sign up</h1>
       <div className="flex justify-center mt-5">
                <div className="w-full max-w-sm">
                    
                <RegisterForm />

                    <p className='mt-10 text-center text-sm text-gray-500'>
					Already have an account?{' '}
					<Link
						href='/login'
						className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
					>
						Login here
					</Link>
				</p>
                </div>
        </div>    
    </>
  );
};


