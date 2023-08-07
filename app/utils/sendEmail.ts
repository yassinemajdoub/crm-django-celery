
type EmailData={
    client_id: string,
    email_message: string,  
    subject:string,
}

export default async function SendEmail(data: EmailData) {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/send-email/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const res =JSON.stringify(data)
      console.log(res)
  
      if (response.ok) {
        return true; 
      } else {
        return false; 
      }
    } catch (error) {
      console.error('An error occurred while sending email:', error);
      return false;
    }
  }