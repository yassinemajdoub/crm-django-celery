import React from 'react';
import NewClientForm from '../components/forms/NewClientForm';


  export default function NewClientPage() {
    
  return (
    <>
        <h1 className="text-2xl text-gray-800 font-light">New Client</h1>

        <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">
                
            <NewClientForm />

            </div>
        </div>
    </>
  );
}
