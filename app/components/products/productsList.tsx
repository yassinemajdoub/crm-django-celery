"use client"

import useProducts from '@/app/products/hooks/UseProducts';
import Product from './product';
import React from 'react'
import Spinner from '../spinner';

export default function ProductList () {

    const {  products,
            isLoading,
           onEditProduct,
        deleteProduct } = useProducts()

  return ( 
    <>
      {isLoading ? (
        <Spinner lg /> // Show the spinner component while loading
      ) : (

        <div className="overflow-x-scroll">
        <table className="table-auto shadow-md mt-10 w-full w-lg">
            <thead className="bg-gray-800">
                <tr className="text-white">
                    <th className="w-1/5 py-2">Nombre</th>
                    <th className="w-1/5 py-2">Price</th>
                    <th className="w-1/5 py-2">Disponible</th>
                    <th className="w-1/5 py-2">Delete</th>
                    <th className="w-1/5 py-2">Edit</th>
                </tr>
            </thead>

            <tbody className="bg-white">
            {products.map((product:product ) => {
            console.log(product);
            return (
                <Product  
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price} 
                description={product.description}
                onEditClient={onEditProduct}
                onDeleteClient={() => deleteProduct (product.id,'products')}
                />
            );}
        )}
            </tbody>
        </table>
        </div>
)}
</>

);
}