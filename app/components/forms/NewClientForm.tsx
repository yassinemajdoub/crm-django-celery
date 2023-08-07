"use client"

import React from 'react';
import Form from './form';
import { useClientCreation } from '@/app/newclient/hooks/useClientCreation';

export default function NewClientForm() {
  const {
    formData,
    isLoading,
    onChange,
    onSubmit,
  } = useClientCreation();

  const config = [
    {
      labelText: 'fullname',
      labelId: 'name',
      type: 'text',
      value: formData.name,
      required: true,
    },
    {
      labelText: 'Email',
      labelId: 'email',
      type: 'email',
      value: formData.email,
      required: true,
    },
    {
      labelText: 'Number',
      labelId: 'phone',
      type: 'number',
      value: formData.phone,
      required: true,
    },
  ];

    return (
        <Form
            config={config}
            isLoading={isLoading}
            btnText='New Client'
            onChange={onChange}
            onSubmit={onSubmit}
        />
    );
}