"use client"

import UseClients from '../../utils/clients/Useclients';
import Client from './client';
import React from 'react'
import Spinner from '../spinner';
import { useAppSelector } from '@/redux/hooks';

export default function ClientList () {
    const { clients,isLoading,onEditClient, deleteNewObject } = UseClients()
    const { isAuthenticated } = useAppSelector(state => state.auth);

    console.log(isAuthenticated)

  return ( 
    
    <>
      {isLoading ? (
        <Spinner lg /> // Show the spinner component while loading
      ) : (
        <div className="overflow-x-scroll">
          <table className="table-auto shadow-md mt-10 w-full w-lg">
            <thead className="bg-gray-800">
              <tr className="text-white">
                <th className="w-1/5 py-2">FullName</th>
                <th className="w-1/5 py-2">Email</th>
                <th className="w-1/5 py-2">Number</th>
                <th className="w-1/5 py-2">Delete</th>
                <th className="w-1/5 py-2">Edit</th>
              </tr>
            </thead>

              {clients.map((client: client) => (
                <Client
                  key={client.id }
                  id={client.id}
                  fullname={client.name}
                  email={client.email}
                  numero={client.phone}
                  onEditClient={onEditClient}
                  onDeleteClient={() =>
                    deleteNewObject(client.id,'clients')
                  }
                />
              ))}

          </table>
        </div>
      )}
    </>

  )
}
