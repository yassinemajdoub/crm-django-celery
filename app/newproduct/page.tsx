import React  from 'react';
import NewProductForm from '../components/forms/NewProductForm';


const page = () => {
  return (
    <>
    <h1 className="text-2xl text-gray-800 font-light">New Product</h1>
    <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">

        <NewProductForm /> 
        </div>
    </div>      
    </>
  )
}

export default page