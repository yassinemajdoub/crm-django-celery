import PasswordResetForm from '../components/forms/PaswordResetForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Password Reset',
	description: 'password reset page',
};


export default function Page() {
	return (
    <>
    <h1 className="text-center text-2xl text-black font-light">Reset your password</h1>
        <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm">

                    <PasswordResetForm />

                    </div>
            </div>    
    </>          
    );
}