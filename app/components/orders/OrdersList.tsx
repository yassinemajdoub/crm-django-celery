"use client"

import useOrders from '@/app/orders/hooks/UseOrders';
import Order from './order';
import React from 'react'
import Spinner from '../spinner';

export default function OrderList () {
    const {  orders,
        isLoading,
        onEditOrder,
        deleteOrder ,
        checkReminderStatus
        } = useOrders()

        const status2dayrem=true
        const status7dayrem=true

  return ( 
    <>
      {isLoading ? (
        <Spinner lg /> // Show the spinner component while loading
      ) : (
    <div className="overflow-x-scroll">
          <table className="table-auto shadow-md mt-10 w-full w-lg">
              <thead className="bg-gray-800">
                  <tr className="text-white">
                      <th className="w-1/5 py-2">Client</th>
                      <th className="w-1/5 py-2">Phone</th>
                      <th className="w-1/5 py-2">Product</th>
                      <th className="w-1/5 py-2">status</th>
                      <th className="w-1/5 py-2">Start_date</th>
                      <th className="w-1/5 py-2">End_date</th>
                      <th className="w-1/5 py-2">total</th>
                      <th className="w-1/5 py-2">Delete</th>
                      <th className="w-1/5 py-2">Edit</th>
                      <th className="w-1/5 py-2">Reminder 7</th>
                      <th className="w-1/5 py-2">Reminder 2</th>
                  </tr>
              </thead>

              {orders.map((order:order ) => {
              console.log(order);
              return (
                <Order
                  key={order.id}
                  id={order.id}
                  client={order.client}
                  product={order.product}
                  start_date={order.start_date}
                  end_date={order.end_date}
                  status={order.status}
                  total={order.total}
                  onEditClient={onEditOrder}
                  onDeleteClient={() => deleteOrder (order.id,'orders')}
                  status7dayrem={checkReminderStatus(order, 7) ? 'sent' : 'not sent'}
                  status2dayrem={checkReminderStatus(order, 2) ? 'sent' : 'not sent'}
                />
              );
            })} 
          </table>  
        </div>
   )}
   </>

  );
}