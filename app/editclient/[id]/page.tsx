import ClientUpdateForm from "@/app/components/forms/ClientUpdateForm";


export default function Page({params:{id}}: Params) {
    

  return (  
    <>
        <h1 className="text-2xl text-gray-800 font-light">Edit Client</h1>

        <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">
            <ClientUpdateForm id={id} />
            </div>
        </div>
    </>
  );
}