import React from 'react';
import ButtonBase from './Button/ButtonBase';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  textColor?:string
}

const sizeClasses = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-3 text-lg',
  xl: 'px-6 py-4 text-xl'
};

export const PrimaryButton: React.FC<ButtonProps> = ({ children, onClick, size = 'md' }) => (
  <ButtonBase
    className={`flex bg-blue-500 text-white hover:bg-blue-500 active:bg-blue-400 rounded-lg shadow-lg ${sizeClasses[size]}`}
    onClick={onClick}
  >
    {children}
  </ButtonBase>
);

export const SecondaryButton: React.FC<ButtonProps> = ({ children, onClick, size = 'md' }) => (
  <ButtonBase
    className={`flex bg-gray-500 text-white hover:bg-gray-600 active:bg-gray-700 rounded-lg ${sizeClasses[size]}`}
    onClick={onClick}
  >
    {children}
  </ButtonBase>
);

export const SuccessButton: React.FC<ButtonProps> = ({ children, onClick, size = 'md' }) => (
  <ButtonBase
    className={`flex bg-green-500 text-white hover:bg-green-600 active:bg-green-700 rounded-lg ${sizeClasses[size]}`}
    onClick={onClick}
  >
    {children}
  </ButtonBase>
);

export const DangerButton: React.FC<ButtonProps> = ({ children, onClick, size = 'md' }) => (
  <ButtonBase
    className={`flex bg-red-500 text-white hover:bg-red-600 active:bg-red-700 rounded-lg ${sizeClasses[size]}`}
    onClick={onClick}
  >
    {children}
  </ButtonBase>
);

export const WarningButton: React.FC<ButtonProps> = ({ children, onClick, size = 'md' }) => (
  <ButtonBase
    className={`flex bg-yellow-500 text-black hover:bg-yellow-600 active:bg-yellow-700 rounded-lg ${sizeClasses[size]} text-gray-100`}
    onClick={onClick}
  >
    {children}
  </ButtonBase>
);

export const InfoButton: React.FC<ButtonProps> = ({ children, onClick, size = 'md' }) => (
  <ButtonBase
    className={`flex bg-teal-500 text-white hover:bg-teal-600 active:bg-teal-700 rounded-lg ${sizeClasses[size]}`}
    onClick={onClick}
  >
    {children}
  </ButtonBase>
);
export const NoFilledButton: React.FC<ButtonProps> = ({ children, onClick, size = 'md',textColor='text-blue-500 hover:bg-teal-50 active:bg-teal-50' }) => (
  <ButtonBase
    className={`flex   ${textColor}  rounded-lg ${sizeClasses[size]}`}
    onClick={onClick}
  >
    {children}
  </ButtonBase>
);