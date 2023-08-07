'use client'

import Form from "./form";
import usePorductUpdate from "@/app/editproduct/[id]/hooks/UseProductUpdate";

export default function ProductUpdateForm({ id }: { id: string }) {
    const {name,price,description,isLoading,onChange,onSubmit} = usePorductUpdate(id)

    const config = [
		{
			labelText: 'Name',
			labelId: 'name',
			type: 'text',
			value: name,
			required: true,
		},
        {
			labelText: 'Price',
			labelId: 'price',
			type: 'number',
			value: price,
			required: true,
		},
        {
			labelText: 'Description',
			labelId: 'description',	
			type: 'text',
			value: description,
			required: true,
		}]

    return (

		<Form
			config={config}
			isLoading={isLoading}
			btnText='Update product'
			onChange={onChange}
			onSubmit={onSubmit}
		/>

	);
}