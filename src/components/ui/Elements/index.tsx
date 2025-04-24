import React, { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, LabelHTMLAttributes,SelectHTMLAttributes } from 'react';

// Utility function to merge Tailwind classes
const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

// Label Component
export const Label = forwardRef<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, children, ...props }, ref) => (
    <label 
      ref={ref}
      className={cn(
        "block text-sm font-medium text-gray-700 mb-2", 
        className
      )}
      {...props}
    >
      {children}
    </label>
  )
);
Label.displayName = 'Label';

// Input Component
export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = 'text', ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
        "text-sm text-gray-900 placeholder-gray-400",
        "disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = 'Input';

// Textarea Component
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
        "text-sm text-gray-900 placeholder-gray-400 min-h-[100px]",
        "disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = 'Textarea';

// Checkbox Component with Enhanced Functionality
export const Checkbox = forwardRef<
  HTMLInputElement, 
  InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    onCheckedChange?: (checked: boolean) => void;
  }
>(({ 
  className, 
  label, 
  onCheckedChange, 
  id, 
  ...props 
}, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    onCheckedChange?.(isChecked);
    props.onChange?.(e);
  };

  const uniqueId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="flex items-center">
      <input
        ref={ref}
        type="checkbox"
        id={uniqueId}
        className={cn(
          "h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500",
          "focus:outline-none focus:ring-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        {...props}
        onChange={handleChange}
      />
      {label && (
        <Label 
          htmlFor={uniqueId} 
          className="ml-2 block text-sm text-gray-900"
        >
          {label}
        </Label>
      )}
    </div>
  );
});
Checkbox.displayName = 'Checkbox';
export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
        "text-sm text-gray-900 placeholder-gray-400",
        "disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
);
Select.displayName = 'Select';

// React Component Example demonstrating usage
// export const FormExample: React.FC = () => {
//   const [formData, setFormData] = React.useState({
//     name: '',
//     description: '',
//     acceptTerms: false
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleCheckboxChange = (checked: boolean) => {
//     setFormData(prev => ({ ...prev, acceptTerms: checked }));
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
//       <h2 className="text-xl font-bold mb-4">Ejemplo de Formulario</h2>
      
//       <div className="mb-4">
//         <Label htmlFor="name">Nombre</Label>
//         <Input
//           id="name"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           placeholder="Ingresa tu nombre"
//         />
//       </div>

//       <div className="mb-4">
//         <Label htmlFor="description">Descripción</Label>
//         <Textarea
//           id="description"
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           placeholder="Escribe una descripción"
//         />
//       </div>

//       <div className="mb-4">
//         <Checkbox
//           id="terms"
//           label="Acepto los términos y condiciones"
//           checked={formData.acceptTerms}
//           onCheckedChange={handleCheckboxChange}
//         />
//       </div>

//       <button 
//         className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//         disabled={!formData.acceptTerms}
//       >
//         Enviar
//       </button>
//     </div>
//   );
// };

// export default FormExample;