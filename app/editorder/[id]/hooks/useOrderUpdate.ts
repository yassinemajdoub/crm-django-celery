import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import updateOrder from './update_order';
import { getOrder } from './getorder';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getClients } from '@/app/utils/clients/getclients';
import getProducts from '@/app/products/hooks/getProducts';
import * as Yup from 'yup';

// Define the validation schema for the order form
const validationSchema = Yup.object().shape({
  client: Yup.string().required('Client is required'),
  product: Yup.string().required('Product is required'),
  status: Yup.string().required('Status is required'),
  start_date: Yup.date().required('Start Date is required'),
  end_date: Yup.date()
    .required('End Date is required')
    .min(Yup.ref('start_date'), 'End Date must be greater than Start Date'),
});

type OrderData = {
  client: string;
  product: string;
  status: string;
  start_date: string;
  end_date: string;
};

export default function useOrderUpdate(id: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [clientOptions, setClientOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [statusOptions, setstatusOptions] = useState([       
    { value: 'paid', label: 'paid' },
    { value: 'unpaid', label: 'unpaid' }]);

  const router = useRouter();

  const [formData, setFormData] = useState<OrderData>({
    client: '',
    product: '',
    status: '',
    start_date: '',
    end_date: '',
  });

  const { client, product, status, start_date, end_date } = formData;

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

  useEffect(() => {
    // Fetch order data on the client-side
    async function fetchOrderData() {
      setIsLoading(true); // Set isLoading to true while fetching data
      try {
        const order = await getOrder(id);
        setFormData({
          client: order.client,
          product: order.product,
          status: order.status,
          start_date: order.start_date,
          end_date: order.end_date,
        });
      } catch (error) {
        console.error('Failed to fetch order data:', error);
      } finally {
        setIsLoading(false); // Set isLoading to false when data fetching is complete
      }
    }

    fetchOrderData();
  }, []);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log(`${name} - ${value}`);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
    };

    setIsLoading(true);

    try {
      await updateOrder(data, id);
      toast.success('Order updated successfully'); // Show a success message (you can use react-toastify or any other notification library)
      router.push('/orders');
    } catch (error) {
      toast.error('Failed to update order'); // Show an error message if the update fails
    } finally {
      setIsLoading(false); // Set isLoading to false after the update is complete (whether successful or not)
    }
  };

  return {
    clientOptions,
    productOptions,
    statusOptions,
    formData,
    isLoading,
    setFormData,
    onChange,
    onSubmit,
  };
}
