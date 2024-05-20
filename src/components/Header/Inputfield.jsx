import React from 'react'

function Inputfield
    (
        {
            input_type = 'text',
            customcss,
            custom_placeholder,
            inputId,
            inputName
        }


    ) {
    return (


        <input

            id={inputId}
            name={inputName}
            className={`fira-sans-light px-3 py-4 my-2.5 outline-none ${customcss} rounded-md w-80 min-w-72 min-h-2
            `}
            type={input_type}
            placeholder={custom_placeholder}

        />


    )
}

export default Inputfield