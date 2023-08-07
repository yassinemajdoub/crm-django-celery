import Input from "./input";
import {FormEvent , ChangeEvent} from 'react';
import Spinner from "../spinner";
import SelectComponent from "./select";

interface SelectOption {
    value: string;
    label: string;
  }


interface Config {
	labelText: string;
	labelId: string;
	type: string;
	value: string;
    link?: {
		linkText: string;
		linkUrl: string;
	};
	required?: boolean;
    options?: SelectOption[]; // Add the options field to support select fields
    selectedOption?: SelectOption | null; // Add selectedOption to store the value of the select field
    setSelectedOption?: (newValue: SelectOption | null) => void; // Add setSelectedOption to update the selected value
  }



interface Props {
    config: Config[];
    isLoading: boolean;
    btnText: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function Form({config,isLoading,btnText,onChange,onSubmit}:Props) {

    return(

            <form
                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                onSubmit={onSubmit}
            >
        {/* {config.map((input) =>
        "options" in input ? (
          // Render the SelectComponent if the input has 'options' property
          <SelectComponent
            key={input.labelId}
            label={input.labelText}
            options={input.options}
            selectedOption={input.selectedOption}
            setSelectedOption={input.setSelectedOption}
          />
        ) : ( */}
        {config.map((input) =>
          // Render the Input component for regular input fields
          <Input
            key={input.labelId}
            labelId={input.labelId}
            type={input.type}
            onChange={onChange}
            value={input.value}
            link={input.link}
            required={input.required}
          >
            {input.labelText}
          </Input>
        )
      }

                <div className="mb-4">
                    <button
                        type="submit"
                        className="bg-gray-800 w-full mt-5 p-2 text-white uppercas hover:cursor-pointer hover:bg-gray-900"
                    disabled={isLoading}
                    >

                    {isLoading ? <Spinner sm /> : `${btnText}`} 
                    </button>
                </div>
            </form>
    );
}