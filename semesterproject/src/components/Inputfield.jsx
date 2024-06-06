import React from 'react'

const Input = React.forwardRef(
    function Inputfield
        (
            {

                type = "text",
                custom_placeholder = "Input Field",
                name,
                handleChanges,
                customcss = "",
                props = "",
                inputId,
                clickHandler



            }, ref
        ) {


        return (

            <input

                type={type}
                id={inputId}
                name={name}
                className={`fira-sans-light px-3 py-4 my-2.5 outline-none ${customcss} rounded-md w-80 min-w-72 min-h-2 text-black
            `}
                placeholder={custom_placeholder}
                ref={ref}
                onBlur={handleChanges}

                {...props}

            />


        )
    })

export default Input