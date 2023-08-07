

export default async function updateOrder(data:orderCreation,id: string) {
    const response = await fetch(`http://127.0.0.1:8000/api/orders/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const res =JSON.stringify(data)
    console.log(res)

    if (!response.ok) throw new Error ('Failed to fetch')
}  
