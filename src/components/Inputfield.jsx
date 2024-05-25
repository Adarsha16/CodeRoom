import React, { useEffect } from 'react'

const Input = React.forwardRef(
    function Inputfield
        (
            {

                customcss,
                custom_placeholder,
                inputId,
                type = 'text',
                props = "",


            }, ref
        ) {


        return (

            <input

                type={type}
                id={inputId}
                className={`fira-sans-light px-3 py-4 my-2.5 outline-none ${customcss} rounded-md w-80 min-w-72 min-h-2
            `}
                placeholder={custom_placeholder}
                ref={ref}
                {...props}
            />


        )
    })

export default Input