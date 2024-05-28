import React, { InputHTMLAttributes,useState } from 'react';
import showPassword from "../../assets/showPassword.svg";
import password from "../../assets/password.svg";
type InputProps = {
  label?: string;
  error?: string;
  placeholder?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = (props) => {
  const { label, error, type,...inputProps } = props;
  const [show,setShow]=useState(false)
  return (
    <div className="mb-4">
          {label && (
        <label
          htmlFor={inputProps.id}
          className="block text-sm text-left font-semibold text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <div className='relative'>
      <input
        {...inputProps}
        type={show?"text":type}
        className="border px-4 py-2 w-full focus:outline-none focus:border-blue-500"
        placeholder={props.placeholder || 'Enter text...'}
      />
      {type==="password" && <img src={show?showPassword:password} onClick={()=>setShow(!show)} alt='noimage' className="cursor-pointer absolute top-1/2 right-4 -translate-y-1/2 w-6 h-6"></img>}
      </div>
      {error && <p className="text-red-500 text-left">{error}</p>}
    </div>
  );
};

export default Input;
