import React from 'react';
import Link from 'next/link';
// import { useRouter } from 'next/router';

/**
 * Sidebar Component is called in Layout and creates a sidebar at the Home page
 */
const Sidebar = () => {
    
    // const router = useRouter();

    return (
        <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
            <div>
                <p className="text-white text-2xl font-black">CRM admin</p>
            </div>

            <nav className="mt-5 list-none">
                {/* <li className={router.pathname === '/' ? 'bg-blue-800 p-2' : 'p-2'}> */}
                <li className='p-2'>
                    <Link href="/">
                        <div className="text-white block">
                            Clients
                        </div>
                    </Link>
                </li>
                {/* <li className={router.pathname === '/orders' ? 'bg-blue-800 p-2' : 'p-2'}> */}
                <li className='p-2'>
                    <Link href="/orders">
                        <div className="text-white block">
                            Orders
                        </div>
                    </Link>
                </li>
                {/* <li className={router.pathname === '/products' ? 'bg-blue-800 p-2' : 'p-2'}> */}
                <li className='p-2'>
                    <Link href="/products">
                        <div className="text-white block">
                            Products
                        </div>
                    </Link>
                </li>
            </nav>
        </aside>
    );
};

export default Sidebar;
