import React, {ChangeEvent} from 'react'

const BaseTextarea = ({
    value,
    name,
    onChange,
    id,
    label,
    errors,
    touched,
}: {
    name?: string,
    value?: string,
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void,
    id?: string,
    label?: string
    errors?: string,
    touched?: boolean
}) => {

    return (
        <div>
            <label htmlFor={id}  className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="mt-1">
                <textarea
                    rows={4}
                    name={name}
                    id={id}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={value}
                    onChange={onChange}
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

export default BaseTextarea
