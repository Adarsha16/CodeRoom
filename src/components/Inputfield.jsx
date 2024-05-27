import React from 'react'

const Input = React.forwardRef(
    function Inputfield
        (
            {

                type = "text",
                custom_placeholder = "Input Field",
                name,
                value,
                handleChanges,
                customcss = "",
                props = ""


            }, ref
        ) {


        return (

            <input

                type={type}
                name={name}
                className={`fira-sans-light px-3 py-4 my-2.5 outline-none ${customcss} rounded-md w-80 min-w-72 min-h-2
            `}
                placeholder={custom_placeholder}
                ref={ref}
                onBlur={handleChanges}
                {...props}
            />


        )
    })

export default Input