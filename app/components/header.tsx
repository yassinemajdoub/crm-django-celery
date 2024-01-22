"use client"

import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { logout as setLogout } from "@/redux/features/authslice";
import { useLogoutMutation } from "@/redux/features/authApiSlice";
import { toast } from 'react-toastify';

const Header = () => {
    const router = useRouter();
	const dispatch = useAppDispatch();

	const [logout] = useLogoutMutation();

	const { isAuthenticated } = useAppSelector(state => state.auth);

    console.log(isAuthenticated)

	const handleLogout = () => {
		logout(undefined)
			.unwrap()
			.then(() => {
				dispatch(setLogout());
			}).finally(()=>{
                router.push('/login')
            });
	};

    return (
        <header className="sm:flex sm:justify-between mb-6">
            <p className="mr-2 mb-5 lg:mb-0">Hello: user</p>

            <button
                type="button"
                className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
                onClick={handleLogout} // Call the handleLogout function
            >
                Log out
            </button>
        </header>
    );
};

export default Header;
