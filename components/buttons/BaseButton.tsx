import type { ReactNode } from 'react'
import { RefreshIcon } from '@heroicons/react/outline'
import React from 'react'

export enum ButtonType {
    Primary = 'primary',
    Danger = 'danger',
    Basic = 'basic',
    Success = 'success'
}

export enum ButtonNativeType {
    Submit = 'submit',
    Button = 'button',
    reset = 'reset'
}

type PropsType = {
    children: ReactNode,
    isLoading?: boolean,
    disabled?: boolean,
    onClick?: () => void,
    className?: string,
    buttonType?: ButtonType,
    filled?: boolean,
    type?: ButtonNativeType,
    icon?:  ReactNode,
}


const BaseButton = ({
    children,
    isLoading,
    disabled,
    onClick,
    className,
    type = ButtonNativeType.Button,
    buttonType = ButtonType.Primary,
    filled = false,
    icon
}: PropsType) => {

    return (
        <button
            onClick={onClick}
            disabled={disabled || isLoading}
            type={type}
            className={
                `w-max
                inline-block
                whitespace-nowrap
                inline-flex 
                items-center
                justify-center 
                py-2 px-4 
                border border-transparent 
                rounded-md shadow-sm 
                text-sm font-medium
                ${buttonType === ButtonType.Primary && filled && 'bg-indigo-600 hover:bg-indigo-700 text-white'}
                ${buttonType === ButtonType.Primary && !filled && 'bg-indigo-50 hover:bg-blue-100 text-indigo-700'}
                ${buttonType === ButtonType.Danger && filled && 'bg-red-600 hover:bg-red-700 text-white'}
                ${buttonType === ButtonType.Danger && !filled && 'bg-red-100 hover:bg-red-200 text-red-700'}
                ${buttonType === ButtonType.Success && filled && 'bg-green-600 hover:bg-green-700 text-white'}
                ${buttonType === ButtonType.Success && !filled && 'bg-green-50 hover:bg-green-200 text-green-700'}
                ${buttonType === ButtonType.Basic && 'border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'}
                focus:outline-none
                disabled:opacity-50 disabled:cursor-not-allowed
                ${className}
                `}
        >
            {
                isLoading ?
                    (
                        <>
                            <RefreshIcon className="h-4 w-4 animate-spin" />
                            <span className="ml-2">
                                Načítavam...
                            </span>
                        </>
                    ) : (
                        <span className="inline-flex gap-2">
                            {
                                icon && (
                                    <span className="h-5 w-5">
                                        {icon}
                                    </span>
                                )
                            }

                            {children}
                        </span>
                    )
            }
        </button>
    )
}



export default BaseButton
