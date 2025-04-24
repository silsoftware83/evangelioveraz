import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
    disabled?: boolean;
}

const ButtonBase: React.FC<ButtonBaseProps> = ({ children, className = '', ...props }) => {
    return (
        <button
       
            className={`font-bold py-2 px-6 rounded ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default ButtonBase;
