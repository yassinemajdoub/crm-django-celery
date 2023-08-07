

export default async function updateproduct(data:productCreation,id: string) {
    const response = await fetch(`http://127.0.0.1:8000/api/products/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error ('Failed to fetch')
}  
