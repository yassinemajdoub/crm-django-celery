import { useState, FormEvent , ChangeEvent,useEffect} from 'react';
import updateclient from './update_client';
import { getClient } from "./getclient";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Fullname is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  phone: Yup.string().matches(/^\d{8}$/, 'Phone number must be 8 numbers').required('Number is required'),
});

export default function useClientUpdate(id:string) {
const [isLoading, setIsLoading] = useState(false);
const router = useRouter()

const [formData, setFormData] = useState<ClientData>({
    name: '',
    email: '',
    phone: "",
  });

const {name,email,phone} = formData   


useEffect(() => {
  // Fetch data on the client-side
  async function fetchClientData() {  
    setIsLoading(true); // Set isLoading to true while fetching data
    try {
      const client = await getClient(id);
      setFormData({
        name: client.name,
        email: client.email,
        phone: client.phone,
      });
    } catch (error) {
      console.error('Failed to fetch client data:', error);
    } finally {
      setIsLoading(false); // Set isLoading to false when data fetching is complete
    }
  }


  fetchClientData();
}, []);

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
        name: name,
        email: email,
        phone: phone,
      };

      
      setIsLoading(true);
    
      try {
        await updateclient(data, id);
        toast.success('Client updated successfully'); // Show a success message (you can use react-toastify or any other notification library)
        router.push('/');
      } catch (error) {
        toast.error('Failed to update client'); // Show an error message if the update fails
      } finally {
        setIsLoading(false); // Set isLoading to false after the update is complete (whether successful or not)
      }
    }
    
    return{
        name,
        email,
        phone,
        isLoading,
        onChange,
        onSubmit
    }
}