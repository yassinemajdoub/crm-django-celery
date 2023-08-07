import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

type ProductData = {
  name: string;
  price: number;
  description: string;
};

async function createProduct(data: ProductData) {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/products/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return true; // Product creation successful
    } else {
      return false; // Product creation failed
    }
  } catch (error) {
    console.error('An error occurred while creating the product:', error);
    return false;
  }
}

  export function useProductCreation() {
    const router = useRouter();
    const [formData, setFormData] = useState<ProductData>({
      name: '',
      price: 0,
      description: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
      console.log(`${name} - ${value}`);
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data: ProductData = {
        name: formData.name,
        price: formData.price,
        description: formData.description,
      };


      setIsLoading(true);
      const success = await createProduct(data);
      setIsLoading(false);

      if (success) {
        toast.success('Product created successfully'); // Show success toast message
        router.push('/products');
      } else {
        toast.error('Failed to create product'); // Show failure toast message
      }
    };

    return {
      formData,
      isLoading,
      onChange,
      onSubmit,
    };
  }
