import React, { SelectHTMLAttributes } from 'react';
import ErrorPrompt from "../../assets/error-prompt.svg";
import "./style.scss";

type InputProps = {
    label?: string | any;
    error?: string;
    placeholder?: string;
    textArea?: boolean
    optionLabel?: string;
    optionValue?: string;
    options?: any[]
} & SelectHTMLAttributes<HTMLSelectElement>;

const Dropdown: React.FC<InputProps> = (props) => {
    const { label, error, className, optionLabel, options, optionValue, ...inputProps } = props;
    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={inputProps.id}
                    className="block text-sm text-left font-medium mb-1 input-field-label"
                >
                    {label}
                </label>
            )}
            <div className='relative'>

                <select
                    className={`my-3.5 input-field ${error ? 'error-input' : ''} ${className || ''}`} {...inputProps}>
                    <option selected hidden>{inputProps?.placeholder || "Select"}</option>
                    {options?.map((option) => <option value={optionValue ? option[optionValue] : option}>{optionLabel ? option[optionLabel] : option}</option>)}
                    <option>Hello</option>
                    <option>Hello</option>
                </select>
                {error && <img src={ErrorPrompt} alt='noimage' className="cursor-pointer absolute top-1/2 right-4 -translate-y-1/2 w-6 h-6"></img>}

            </div>
        </div>
    );
};

export default Dropdown;
