'use client'

import Form from "./form";
import useClientUpdate from "@/app/editclient/[id]/hooks/UseClientUpdate";

export default function ClientUpdateForm({ id }: { id: string }) {
    const {name,email,phone,isLoading,onChange,onSubmit} = useClientUpdate(id)

    const config = [
		{
			labelText: 'Full Name',
			labelId: 'name',
			type: 'text',
			value: name,
			required: true,
		},
        {
			labelText: 'Email',
			labelId: 'email',
			type: 'text',
			value: email,
			required: true,
		},
        {
			labelText: 'Number',
			labelId: 'phone',	
			type: 'number',
			value: phone.toString(),
			required: true,
		}]

    return (

		<Form
			config={config}
			isLoading={isLoading}
			btnText='Update client'
			onChange={onChange}
			onSubmit={onSubmit}
		/>

	);
}