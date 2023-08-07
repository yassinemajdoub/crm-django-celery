import { ChangeEvent } from 'react';
import Link from 'next/link';

interface Props {
	labelId: string;
	type: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	value: string;
	children: React.ReactNode;
    link?: {
		linkText: string;
		linkUrl: string;
	};
	required?: boolean;
}

export default function Input({
	labelId,
	type,
	onChange,
	value,
	children,
    link,
	required = false,
}: Props) {



	return (

        <div className="mb-4">
            <div className='flex justify-between align-center'>
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor={labelId}
                    >
                    {children}  
                    </label>


                    {link && (
					<div className='text-sm'>
						<Link
							className='font-semibold text-blue-800 hover:text-indigo-500'
							href={link.linkUrl}
						>
							{link.linkText}
						</Link>
					</div>
				)}
                </div>

                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id={labelId}
                        name={labelId}
                        type={type}
                        placeholder={labelId}
                        value={value}
                        onChange={onChange}
                        required={required}
                    />
                </div>

    );
}