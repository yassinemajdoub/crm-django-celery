import React from "react";
import Select from "react-select";

interface SelectOption {
  value: string;
  label: string;
}

interface Props {
  label: string;
  options: SelectOption[];
  selectedOption: SelectOption | null;
  setSelectedOption: (newValue: SelectOption | null) => void;
}

export default function SelectComponent({ label, options, selectedOption, setSelectedOption }: Props) {
  const handleChange = (newValue: SelectOption | null) => {
    setSelectedOption(newValue);
  };

  return (
    <>
      <div className="block text-gray-700 text-sm font-bold my-2">{label}:</div>
      <Select
        defaultValue={selectedOption}
        onChange={handleChange}
        options={options}
      />
    </>
  );
}
