  import React from 'react';
  import Link from 'next/link';
  import ClientList from './components/clients/clientList';
  import RequireAuth from './utils/RequireAuth';

  export default async function Home() {
    return (
      <>
        {/* Your page content */}
        {/* <RequireAuth> */}

        <h1 className="text-2xl text-gray-800 font-light">Clients</h1>
              
        <Link href="/newclient">
            <div className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold w-full lg:w-auto text-center">
                New Client
            </div>
        </Link>

        <ClientList />
        {/* </RequireAuth> */}
      </>
    );
  }
