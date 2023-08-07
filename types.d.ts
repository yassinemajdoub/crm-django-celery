import Order from "./app/components/orders/order"

type Params ={
    params:{
        id:string
    }
  }

type client={
    id       : string
    name        : string
    email       : string
    phone   : number
}   


type Product={
    id:string
    name : string
    price : number
    description : string
}

type productCreation ={
    name : string
    price : number
    description : string
}

type ClientData = {
    name: string;
    email: string;
    phone: string;
  };

type order = {
    id:string
    client :client
    product :product
    start_date :string
    end_date :string
    total : number
}

type orderCreation={
    client :string
    product :string
    status:string
    start_date :string
    end_date :string
}

type Task = {
    id :string,
    order : order,
    days_before:number,
}