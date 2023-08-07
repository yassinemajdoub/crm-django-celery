import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useRegisterMutation } from '@/redux/features/authApiSlice';
import { toast } from 'react-toastify';

export default function useRegister() {

    const [register,{isLoading}]=useRegisterMutation()
    const router=useRouter();

    const [formData,setFormData]= useState({
        firstname:'',
        lastname:'',
        email:'',
        password:'',
        re_password:'',
    })

    const {firstname,lastname,email,password,re_password}=formData

    const onChange = (event :ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        console.log(`${name} - ${value}`);
      };
    
      const onSubmit = async (event :FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        register({firstname,lastname,email,password,re_password})
        .unwrap()
        .then(()=>
        {
            toast.success('please check email to verify account')
            router.push('/login')
        })
        .catch(()=>{
            toast.error('failed to register')
        })
    };
        return {
            firstname,
            lastname,
            email,
            password,
            re_password,
            isLoading,
            onChange,
            onSubmit,
        };
    }