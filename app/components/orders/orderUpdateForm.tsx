"use client"

import React from 'react';
import Select from 'react-select';
import useOrderUpdate from '@/app/editorder/[id]/hooks/useOrderUpdate';


export default function UpdateOrderForm({ id }: { id: string }) {
    const   { formData,isLoading,setFormData,onChange,onSubmit,clientOptions,productOptions,statusOptions } = useOrderUpdate(id)
    const { client, product,status, start_date, end_date } =formData

return(
    <>

    <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
        <div className="block text-gray-700 text-sm font-bold my-2">Client:</div>
            <Select options={clientOptions}
             value={clientOptions.find((option) => option.value === client)}
             onChange={
                (e) =>{ setFormData((formData) =>({ ...formData, client: e.value }) )
                console.log(`${client}`)}}
               />

            <div className="block text-gray-700 text-sm font-bold my-2">Products:</div>
            <Select
            options={productOptions}
            value={productOptions.find((option) => option.value === product)}
            onChange={
                (e) =>{ setFormData((formData) =>({ ...formData, product: e.value }) )
                console.log(`${product}`)}}
            />

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold my-2" htmlFor="start_date">
            Start Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="start_date"
            type="date"
            onChange={onChange}
            value={start_date}
            name="start_date"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold my-2" htmlFor="end_date">
            End Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="end_date"
            type="date"
            onChange={onChange}
            value={end_date}
            name="end_date"
          />
        </div>
        <div className="block text-gray-700 text-sm font-bold my-2">Status:</div>
        <Select options={statusOptions} 
              value={statusOptions.find((option) => option.value === status)}
              onChange={
                (e) =>{ setFormData((formData) =>({ ...formData, status: e.value }) )
                console.log(`${status}`)}}
               />

        <input
          type="submit"
          className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
          value="Create Order"
        />
      </form>

</>
)}