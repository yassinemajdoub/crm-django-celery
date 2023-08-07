import React from 'react';
import { string } from 'yup';
type Client={
  id       : string
  name        : string
  email       : string
  phone   : number
}   


type Product={
  id:string
  name : string
  price : number
  description : string
}


interface Order {
    id:string
    client :Client
    product :Product
    start_date :String
    end_date :String
    total : number
    status:string
    onEditClient: (clientId: string) => void;
    onDeleteClient: () => void;
    status7dayrem:string,
    status2dayrem:string,
}


    const Order = (props:Order ) => {
        const { client, product, start_date, end_date, total,status2dayrem,status7dayrem,status} = props;

        const onEditClient = () => {
          props.onEditClient(props.id); // Call the function from the prop
        };
        
  return (
    <tbody>
      <tr>
        <td className="border px-4 py-2 text-center">{client.name}</td>
        <td className="border px-4 py-2 text-center">{client.phone}</td>
        <td className="border px-4 py-2 text-center">{product.name}</td>
        <td className="border px-4 py-2 text-center">{status}</td>
        <td className="border px-4 py-2 text-center">{start_date}</td>
        <td className="border px-4 py-2 text-center">{end_date}</td>
        <td className="border px-4 py-2 text-center">{total}</td>
        <td className="border px-4 py-2 text-center">
          <button
            type="button"
            className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
            onClick={() => props.onDeleteClient()}
          >
            Delete
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-4 h-4 ml-2"
            >
              <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </button>
        </td>
        <td className="border px-4 py-2">
          <button
            type="button"
            className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
            onClick={() => onEditClient()}
          >
            Edit
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-4 h-4 ml-2"
            >
              <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
          </button>
        </td>
        <td className="border px-4 py-2 text-center">{status7dayrem}</td>
        <td className="border px-4 py-2 text-center">{status2dayrem}</td>
      </tr>
    </tbody>
  );
};

export default Order;
