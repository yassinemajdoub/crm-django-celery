import { useState, useEffect } from 'react';
import getorders from './getOrders';
import deleteObject from '@/app/utils/deleteobjecthook';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getScheduledTask } from '@/app/utils/orders/getScheduledTasks';
import { Task } from '@/types';
import Order from '@/app/components/orders/order';

type order = {
  id:string
  client :client
  product :product
  start_date :string
  end_date :string
  total : number
}


export default function useOrders() {
  const [orders, setOrders] = useState<order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ScheduledTasks, setScheduledTasks] = useState<Task[]>([]);
  const router = useRouter();

  const fetchStatusData = async () => {
    try {
      const statusData = await getScheduledTask();
      setScheduledTasks(statusData);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
        setIsLoading(false); // Set isLoading to false once the data is fetched (or in case of an error)
    }
  };

  useEffect(() => {
    fetchStatusData();
  }, []);

  const checkReminderStatus = (order: order, daysBefore: number): boolean => {
    const foundTasks = ScheduledTasks.filter((task) => {
      const isOrderMatch = Number(task.order) === Number(order.id);
      const isDaysBeforeMatch = task.days_before === daysBefore;
      return isOrderMatch && isDaysBeforeMatch;
    });
    return foundTasks.length > 0;
  };
  
  
  

  const fetchOrdersData = async () => {
    try {
      const ordersData = await getorders();
      setOrders(ordersData);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false); // Set isLoading to false once the data is fetched (or in case of an error)
    }
  };

  useEffect(() => {
    fetchOrdersData();
  }, []);

  const onEditOrder = (orderId: string) => {
    router.push(`/editorder/${orderId}`);
  };

  const deleteOrderHandler = async (orderId: string, object: string) => {
    setIsLoading(true);
    const success = await deleteObject({ id: orderId, object });
    setIsLoading(false);

    if (success) {
      // Remove the deleted order from the orders state
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
      toast.success('Order deleted successfully');
      router.push(`/${object}`);
    } else {
      toast.error('Failed to delete order');
    }
  };

  return {
    orders,
    isLoading,
    onEditOrder,
    deleteOrder: deleteOrderHandler,
    checkReminderStatus,
  };
}
