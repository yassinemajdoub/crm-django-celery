
export async function getOrder(Id: string) { 
    const res = await fetch(`http://127.0.0.1:8000/api/orders/${Id}`);

    if (!res.ok) throw new Error ('Failed to fetch')

    return res.json();
  }
 