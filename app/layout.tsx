import '../styles/globals.css';


import React from 'react';
import Head from 'next/head';
import CustomProvider from '@/redux/provider';

import Sidebar from './components/sidebar';
import Header from './components/header';
import Setup from './utils/toastSetup';
// import { useRouter } from 'next/router';// Update the import statement

interface Props {
  children: React.ReactNode;
}

const Layout = (props: Props) => {
  // const router = useRouter();

  return (
    <>
    <html lang="en" suppressHydrationWarning={true}>
      <Head>
        <title>CRM PTV</title>
      </Head> 
      <body suppressHydrationWarning={true} >
      <CustomProvider> 
        <Setup />
        <div className="bg-gray-200 min-h-screen">
          <div className="sm:flex min-h-screen">
            <Sidebar />

            <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5">
              <Header />
              {props.children}
            </main>
          </div>
        </div>
        </CustomProvider> 
      </body>
      </html>
    </>
  );
};

export default Layout;
