import React from 'react'
import Link from 'next/link';
import ProductList from '../components/products/productsList';
import { getProducts } from '../utils/products/getproducts';


  export default async function products () {

      const products = await getProducts()
  return (
    <>
    <h1 className="text-2xl text-gray-800 font-light">Products</h1>
                
                <Link 
                    href="/newproduct"
                    className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold w-full lg:w-auto text-center"
                >
                    New Products
                </Link>
                <ProductList />

                </>
    );
}
