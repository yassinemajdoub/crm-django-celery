"use client"

import React from 'react';
import Form from './form';
import { useProductCreation } from '@/app/newproduct/hooks/UseProductCreation';

export default function NewProductForm () {
  const { formData, isLoading, onChange, onSubmit } = useProductCreation();

  const config = [
    {
      labelText: 'Name',
      labelId: 'name',
      type: 'text',
      value: formData.name,
      required: true,
    },
    {
      labelText: 'Price',
      labelId: 'price',
      type: 'number',
      value: formData.price.toString(),
      required: true,
    },
    {
      labelText: 'Description',
      labelId: 'description',
      type: 'text',
      value: formData.description,
      required: true,
    },
  ];

  return (
    <Form
      config={config}
      isLoading={isLoading}
      btnText="Create Product"
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};
