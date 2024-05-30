import React, { ButtonHTMLAttributes } from 'react';
import "./style.scss"

type ButtonProps = {
  variant?: "primary" | "outlined"
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ variant, ...props }) => {
  return (
    <button
      {...props}
      className={`${variant || 'primary'} rounded-lg text-white font-bold py-3 px-4 focus:outline-none ${props.className || ''}`}
    >
      {props?.children}
    </button>
  );
};

export default Button;
