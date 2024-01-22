'use client';

import { redirect } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import Spinner from '../components/spinner';

interface Props {
	children: React.ReactNode;
}

export default function RequireAuth({ children }: Props) {
	const { isLoading, isAuthenticated } = useAppSelector(state => state.auth);
    
    console.log(isAuthenticated)


	if (!isAuthenticated) {
		// redirect('/login');
	}

	return <>{children}</>;
}