import React, { TextareaHTMLAttributes, useState } from 'react';
import ErrorPrompt from "../../assets/error-prompt.svg";
import "./style.scss";

type InputProps = {
    label?: string | any;
    error?: string;
    placeholder?: string;
} & (TextareaHTMLAttributes<HTMLTextAreaElement>);

const TextBox: React.FC<InputProps> = ({ ...props }) => {
    const { label, error, className, ...inputProps } = props;
    const [show, setShow] = useState(false)
    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={inputProps.id}
                    className="block text-sm text-left font-medium mb-1"
                >
                    {label}
                </label>
            )}
            <div className='relative'>
                <textarea className={`my-3.5 input-field ${error ? 'error-input' : ''} ${className || ''}`}  {...inputProps} ></textarea>
                {error && <img src={ErrorPrompt} alt='noimage' className="cursor-pointer absolute top-1/2 right-4 -translate-y-1/2 w-6 h-6"></img>}
            </div>
        </div>
    );
};

export default TextBox;
