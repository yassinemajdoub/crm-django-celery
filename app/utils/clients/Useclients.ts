import React, { useState, useEffect } from 'react';
import { getClients } from './getclients';
import deleteObject from '../deleteobjecthook';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';



export default function UseClients() {

   const [clients, setClients] = useState<client[]>([]);
   const [isLoading, setIsLoading] = useState(true);

   const router = useRouter();

  const fetchClientsData = async () => {
    try {
      const clientData = await getClients();
      setClients(clientData);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
        setIsLoading(false); // Set isLoading to false once the data is fetched (or in case of an error)
    }
  };

  useEffect(() => {
    fetchClientsData();
  }, []);
  
  const onEditClient = (clientId: string) => {
    router.push(`/editclient/${clientId}`);
  };

  const deleteClientHandler = async (clientId: string, object: string) => {
    setIsLoading(true);
    const success = await deleteObject({ id: clientId, object });
    setIsLoading(false);

    if (success) {
      // Remove the deleted client from the clients state
      setClients((prevClients) => prevClients.filter((client) => client.id !== clientId));
      toast.success('Client deleted successfully');
      if (!(object === 'clients')) {
        router.push(`/${object}`);
      } else {
        router.push('/');
      }
    } else {
      toast.error('Failed to delete client');
    }
  };

  return {
    clients,
    isLoading,
    onEditClient,
    deleteNewObject : deleteClientHandler,
  }

}