import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { setAuth,finishInitialLoad } from '@/redux/features/authslice';
import { useVerifyMutation } from '@/redux/features/authApiSlice';
import { useAppSelector } from '@/redux/hooks';

export default function useVerify() {
	const dispatch = useAppDispatch();
    const { isLoading, isAuthenticated } = useAppSelector(state => state.auth);

	const [verify] = useVerifyMutation();

	useEffect(() => {
		verify(undefined)
			.unwrap()
			.then(() => {
				dispatch(setAuth());
			})
			.finally(() => {
				dispatch(finishInitialLoad());
			});

            console.log(isAuthenticated)
	}, []);
}