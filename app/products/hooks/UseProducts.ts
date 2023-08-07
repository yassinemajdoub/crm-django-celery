import { useState, useEffect } from 'react';
import getProducts from './getProducts';
import deleteObject from '@/app/utils/deleteobjecthook';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function useProducts() {
  const [products, setProducts] = useState<product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchProductsData = async () => {
    try {
      const productsData = await getProducts();
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false); // Set isLoading to false once the data is fetched (or in case of an error)
    }
  };

  useEffect(() => {
    fetchProductsData();
  }, []);

  const onEditProduct = (productId: string) => {
    router.push(`/editproduct/${productId}`);
  };

  const deleteProductHandler = async (productId: string, object: string) => {
    setIsLoading(true);
    const success = await deleteObject({ id: productId, object });
    setIsLoading(false);

    if (success) {
      // Remove the deleted product from the products state
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
      toast.success('Product deleted successfully');
        router.push(`/${object}`);
    } else {
      toast.error('Failed to delete product');
    }
  };

  return {
    products,
    isLoading,
    onEditProduct,
    deleteProduct: deleteProductHandler,
  };
}
