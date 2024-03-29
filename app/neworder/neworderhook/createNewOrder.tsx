import { useState } from 'react';
import { useRouter } from 'next/navigation';

export async function createOrder( data:orderCreation) {
    // Your logic to create a client goes here
    // You can use fetch or any other method to send a POST request to your API
    // Return true or false depending on the success of the creation
    try {
      // Assuming you send the data to the API and get a successful response
      const response = await fetch('http://127.0.0.1:8000/api/orders/', {
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