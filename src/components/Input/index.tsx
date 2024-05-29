import React, { InputHTMLAttributes, useState } from 'react';
import showPassword from "../../assets/showPassword.svg";
import password from "../../assets/password.svg";
import ErrorPrompt from "../../assets/error-prompt.svg";
import "./style.scss";

type InputProps = {
  label?: string | any;
  error?: string;
  placeholder?: string;
  textArea?: boolean
} & InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = (props) => {
  const { label, error, type, className, ...inputProps } = props;
  const [show, setShow] = useState(false)
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
        {<input
          className={`my-3.5 input-field ${error ? 'error-input' : ''} ${className || ''}`}
          {...inputProps}
          type={show ? "text" : type}
          placeholder={error || props.placeholder || 'Enter text...'}
        />}
        {type === "password" && <img src={show ? showPassword : password} onClick={() => setShow(!show)} alt='noimage' className="cursor-pointer absolute top-1/2 right-4 -translate-y-1/2 w-6 h-6"></img>}
        {error && (type !== "password") && <img src={ErrorPrompt} alt='noimage' className="cursor-pointer absolute top-1/2 right-4 -translate-y-1/2 w-6 h-6"></img>}

      </div>
    </div>
  );
};

export default Input;
