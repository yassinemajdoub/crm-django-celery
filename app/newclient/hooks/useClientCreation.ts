import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Fullname is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  phone: Yup.string().matches(/^\d{8}$/, 'Phone number must be 8 numbers').required('Number is required'),
});

async function createClient(data: ClientData) {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/clients/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return true; // Client creation successful
    } else {
      return false; // Client creation failed
    }
  } catch (error) {
    console.error('An error occurred while creating the client:', error);
    return false;
  }
}

export function useClientCreation() {
  const router = useRouter();
  const [formData, setFormData] = useState<ClientData>({
    name: '',
    email: '',
    phone: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log(`${name} - ${value}`);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      await validationSchema.validate(formData, { abortEarly: false });
    } catch (error) {
      // Handle validation errors
      const errorMessages = error.inner.map((err) => err.message);
      errorMessages.forEach((message) => toast.error(message, { autoClose: 2000 }));
      return;
    }

    const data: ClientData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    };

    setIsLoading(true);
    const success = await createClient(data);
    setIsLoading(false);

    if (success) {
      toast.success('Client created successfully'); // Show success toast message
      router.push('/');
    } else {
      toast.error('Failed to create client'); // Show failure toast message
    }
  };

  return {
    formData,
    isLoading,
    onChange,
    onSubmit,
  };
}
