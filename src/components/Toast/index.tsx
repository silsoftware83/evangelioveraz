import React, { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'info'| 'warning' | 'default';

interface ToastProps {
  message: string;
  type?: ToastType;
  onClose: () => void;
  duration?: number;
}

const typeStyles: Record<ToastType, string> = {
  success: 'bg-green-800 text-white',
  error: 'bg-red-600 text-white',
  info: 'bg-blue-600 text-white',
  warning: 'bg-yellow-600 text-white',
  default: 'bg-gray-600 text-white',
};

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={`fixed bottom-5 right-5 z-50 px-4 py-2 rounded-lg shadow-md transition-opacity duration-300 opacity-100 ${typeStyles[type]}`}>
      {message}
      {type === 'error' &&   <span className="ml-2">❌</span>}
      {type === 'success' && <span className="ml-2">✅</span>}
      {type === 'info' &&    <span className="ml-2">ℹ️</span>}
      {type === 'warning' && <span className="ml-2">⚠️</span>}
      {type === 'default' && <span className="ml-2">ℹ️</span>}
     
    </div>
  );
};
