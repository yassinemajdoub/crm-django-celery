import { useState, FormEvent , ChangeEvent,useEffect} from 'react';
import updateproduct from './update_product';
import { getProduct } from './getproduct';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    price: Yup.number().positive('Price must be positive').required('Price is required'),
    description: Yup.string().required('Description is required'),
  });

  type productCreation ={
    name : string
    price : number
    description : string
}

export default function usePorductUpdate(id:string) {
const [isLoading, setIsLoading] = useState(false);
const router = useRouter()

const [formData, setFormData] = useState<productCreation>({
    name: '',
    price: 0,
    description: '',
  });
  const { name, price, description } = formData;   


  useEffect(() => {
    // Fetch data on the client-side
    async function fetchProductData() {
      setIsLoading(true);
      try {
        const product = await getProduct(id);
        setFormData({
          name: product.name,
          price: product.price,
          description: product.description,
        });
      } catch (error) {
        console.error('Failed to fetch product data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProductData();
  }, [id]);

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
        const errorMessages = error.inner.map((err) => err.message);
        errorMessages.forEach((message) => toast.error(message, { autoClose: 2000 }));
        return;
      }
  
      const data: productCreation = {
        name: name,
        price: price,
        description: description,
      };
  
      setIsLoading(true);
      
      try {
        await updateproduct(data,id);
        toast.success('Product updated successfully');
        // Handle redirection after successful update if needed
        router.push('/products');
      } catch (error) {
        toast.error('Failed to update product');
      } finally {
        setIsLoading(false);
      }
    };
    
    return {
        name,
        price,
        description,
        isLoading,
        onChange,
        onSubmit,
      };
}