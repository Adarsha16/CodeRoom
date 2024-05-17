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
            className={`p-3 m-2 outline-none ${customcss} border-2 border-brown rounded-md w-80 min-w-72 min-h-5
            `}
            type={input_type}
            placeholder={custom_placeholder}

        />


    )
}

export default Inputfield