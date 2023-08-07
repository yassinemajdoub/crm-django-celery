import React from 'react'
import Link from 'next/link'
import OrderList from '../components/orders/OrdersList'



export default async function Orders() {
  return (
    <>
      <h1 className="text-2xl text-gray-800 font-light">Orders</h1>

      <div className="space-x-4">
        <Link href="/neworder">
          <div className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 uppercase font-bold">
            New Order
          </div>
        </Link>

        <Link href="/sendemail">
          <div className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 uppercase font-bold">
            Send Email
          </div>
        </Link>
      </div>

      <OrderList />
    </>
  )
}
