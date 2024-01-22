"use client"

import React, { useState, FormEvent , ChangeEvent,useEffect} from 'react';
import Select from 'react-select';
import { useRouter } from 'next/navigation';
import { getClients } from '@/app/utils/clients/getclients';
import getProducts from '@/app/products/hooks/getProducts';
import { createOrder } from '@/app/neworder/neworderhook/createNewOrder';
import * as Yup from 'yup';
import Spinner from '../spinner';
import { toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
  client: Yup.string().required('Client is required'),
  product: Yup.string().required('Product is required'),
  status: Yup.string().required('Status is required'),
  start_date: Yup.date().required('Start Date is required'),
  end_date: Yup.date()
    .required('End Date is required')
    .min(Yup.ref('start_date'), 'End Date must be greater than Start Date'),
});

export default function NewOrderForm() {
    const router = useRouter();
    const [clientOptions, setClientOptions] = useState([]);
    const [productOptions, setProductOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [statusOptions, setstatusOptions] = useState([       
                                                        { value: 'paid', label: 'paid' },
                                                        { value: 'unpaid', label: 'unpaid' }]);
                                                        

    const [formData, setFormData] = useState<{
        client: string;
        product: string;
        status: string ;
        start_date: string;
        end_date: string;
    }>({
        client: "",
        product: "",
        status: "",
        start_date: '',
        end_date: '',
    });
                                                          
    
    const { client, product,status, start_date, end_date } = formData;

    useEffect(() => {
        // Fetch clients and products
        const fetchClientsAndProducts = async () => {
            const clients = await getClients();
            const products = await getProducts();

            const clientOptionsvar = clients.map((client:client) => ({
            value: client.id,
            label: client.name,
            }));

            const productOptionsvar = products.map((product:product) => ({
            value: product.id,
            label: product.name,
            }));
            setClientOptions(clientOptionsvar)
            setProductOptions(productOptionsvar)
        };

            fetchClientsAndProducts();
        }, [])

    const onChange = (event :ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        console.log(`${name} - ${value}`);
      };  
    
    const onSubmit = async (event :FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
          await validationSchema.validate(formData, { abortEarly: false });
        } catch (error) {
          // Handle validation errors
          const errorMessages = error.inner.map((err) => err.message);
          errorMessages.forEach((message) => toast.error(message, { autoClose: 2000 }));
          return;
        }
    
        const data = {
            client: client,
            product: product,  
            status: status,
            start_date: start_date,
            end_date: end_date,
          }
          setIsLoading(true);
          const success = await createOrder(data);
          setIsLoading(false);

          if (success) {
            toast.success('Order created successfully'); // Show success toast message
            router.push('/orders');
          } else {
            toast.error('Failed to create Order'); // Show failure toast message
          }
          
        };

    return(
        <>
    
        <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
            <div className="block text-gray-700 text-sm font-bold my-2">Client:</div>
                <Select options={clientOptions}
                 onChange={
                    (e) =>{ setFormData((formData) =>({ ...formData, client: e.value }) )
                    console.log(`${client}`)}}
                   />

                <div className="block text-gray-700 text-sm font-bold my-2">Products:</div>
                <Select
                options={productOptions}
                className="basic-multi-select"
                classNamePrefix="select"
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
                 onChange={
                    (e) =>{ setFormData((formData) =>({ ...formData, status: e.value }) )
                    console.log(`${status}`)}}
                   />
              <button
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
              disabled={isLoading}>
              {isLoading ? <Spinner sm /> : "Create Order"} 
              </button>
      
          </form>

</>
)}