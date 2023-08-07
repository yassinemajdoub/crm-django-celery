type DeletionID = {
  id: string;
  object: string;
};

async function deleteObject(data: DeletionID): Promise<boolean> {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/${data.object}/${data.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return response.ok;
  } catch (error) {
    console.error('An error occurred while Deleting', error);
    return false;
  }
}

export default deleteObject;