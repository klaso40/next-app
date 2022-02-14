import React from 'react'

type PropsType = {
    id?: string,
    name?: string,
    label?: string,
    placeholder?: string,
    type?: string,
    autoComplete?: string,
    value?: any,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    touched?: boolean,
    errors?: string,
    className?: string,
    multiple?: boolean
}


const BaseInput = ({
   label,
   placeholder,
   errors,
   onChange,
   value,
   id,
   name,
   type = 'text',
   autoComplete,
   touched,
   className,
   multiple
}: PropsType) => {

    return (
        <div className={className}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="mt-1">
                <input
                    id={id}
                    name={name}
                    type={type}
                    autoComplete={autoComplete}
                    onChange={onChange}
                    value={value}
                    placeholder={placeholder}
                    multiple={multiple}
                    className={`
                    appearance-none b
                    lock 
                    w-full 
                    px-3 py-2 
                    border border-gray-300 
                    rounded-md shadow-sm placeholder-gray-400 
                    focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 
                    sm:text-sm
                    ${className}
                    `
                    }
                />
                {
                    errors && touched &&
                    <span className="text-red-600 text-sm">
                            {errors}
                    </span>
                }
            </div>
        </div>
    )
}





export default BaseInput
