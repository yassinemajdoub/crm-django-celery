

export default async function updateclient(data:ClientData,id: string) {
    const response = await fetch(`http://127.0.0.1:8000/api/clients/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error ('Failed to fetch')
}  
