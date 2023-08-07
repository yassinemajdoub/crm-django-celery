'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import SendEmail from '../utils/sendEmail';
import Select from "react-select";
import { getClients } from '../utils/clients/getclients';
import Spinner from './spinner';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  client: Yup.string().required('Client is required'),
  EmailMessage: Yup.string().required('Email Message is required'),
  subject: Yup.string().required('Subject is required'),
});


export default function SendEmailForm() {
    const [clientOptions, setClientOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState<{
        client: string;
        EmailMessage:string;
        subject:string;
    }>({
            client: "",
            EmailMessage: "", 
            subject:""
        });

    const { client, EmailMessage,subject } = formData;

    type client={
        id       : string
        name        : string
        email       : string
        phone   : number
    }  

    useEffect(() => {
        // Fetch clients and products
        const fetchClients = async () => {
            setIsLoading(true)
            const clients = await getClients();

            const clientOptionsvar = clients.map((client:client) => ({
                value: client.id,
                label: client.name,
                }));
                setClientOptions(clientOptionsvar)
                setIsLoading(false)
            };
            

            fetchClients();
        }, [])

    const onChange = (event :ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        console.log(`${name} - ${value}`);
        };  

    
    const onSubmit = async (event :FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Validate form data using Yup
        try {
            await validationSchema.validate(formData, { abortEarly: false });
        } catch (error) {
            // Handle validation errors
            const errorMessages = error.inner.map((err) => err.message);
            errorMessages.forEach((message) => toast.error(message, { autoClose: 2000 }));
            return;
        }
    
        const data = {
            client_id: client,
            email_message: EmailMessage,  
            subject:subject,
        };

        setIsLoading(true);

        try {
          const success = await SendEmail(data);
    
          if (success) {
            toast.success('Email sent successfully', { autoClose: 2000 });
          } else {
            toast.error('Failed to send email', { autoClose: 2000 });
          }
        } catch (error) {
          console.error('An error occurred while sending email:', error);
          toast.error('An error occurred while sending email', { autoClose: 2000 });
        } finally {
          setIsLoading(false);
        }
      };
	return (
        <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
            <div className="block text-gray-700 text-sm font-bold my-2">Client:</div>
                <Select options={clientOptions}
                 onChange={
                    (e) =>{ setFormData((formData) =>({ ...formData, client: e.value }) )
                    console.log(`${client}`)}}
                   />

            <div className="mb-4">
            <div className='flex justify-between align-center'>
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="Subject"
                    >
                    Subject
                    </label>   

            </div>

                <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Subject"
                placeholder='Email Subject'
                name="subject"
                value={subject} // Use the 'value' prop to bind the value of the text area to 'EmailMessage' state
                onChange={onChange}
                required
                />
            </div>
            
        <div className="mb-4">
            <div className='flex justify-between align-center'>
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="Email"
                    >
                    Email Message
                    </label>   

            </div>

                <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Email"
                name="EmailMessage"
                placeholder='Email Body'
                value={EmailMessage} // Use the 'value' prop to bind the value of the text area to 'EmailMessage' state
                onChange={onChange}
                required
                />
            </div>

            <div className="mb-4">
                    <button
                        type="submit"
                        className="bg-gray-800 w-full mt-5 p-2 text-white uppercas hover:cursor-pointer hover:bg-gray-900"
                    disabled={isLoading}
                    >

                    {isLoading ? <Spinner sm /> : "Submit"} 
                    </button>
                </div>
        </form>

	);
}