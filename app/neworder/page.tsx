import NewOrderForm from "../components/orders/newOrder";

export default function NewOrderPage() {
  return (
    <>
      <h1 className="text-2xl text-gray-800 font-light">New Order</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <NewOrderForm />
          
        </div>
      </div>
    </>
  );
}

