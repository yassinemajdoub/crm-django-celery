import React from 'react'
import SendEmailForm from '../components/SendEmailForm'

const page = () => {
  return (
    <>
    <h1 className="text-2xl text-gray-800 font-light">Send Email</h1>

    <div className="flex justify-center mt-5">
      <div className="w-full max-w-lg">
        <SendEmailForm />
        
      </div>
    </div>
  </>
  )
}

export default page