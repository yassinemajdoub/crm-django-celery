import PasswordResetConfirmForm from '@/app/components/forms/PasswordResetConfirmForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: ' Password Reset Confirm',
	description: 'password reset confirm page',
};

interface Props {
	params: {
		uid: string;
		token: string;
	};
}

export default function Page({ params: { uid, token } }: Props) {
	return (
        <>
        <h1 className="text-center text-2xl text-black font-light">Reset your password</h1>
            <div className="flex justify-center mt-5">
                        <div className="w-full max-w-sm">
    
                        <PasswordResetConfirmForm uid={uid} token={token} />
    
                        </div>
                </div>    
        </>      
    );
}