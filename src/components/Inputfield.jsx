import React from 'react'

function Inputfield
    (
        {
            input_type = 'text',
            customcss,
            custom_placeholder,
            inputId,
            inputName,
            getUserData,
            props = ""

        }
    ) {



    function handleInput(event) {



        const { id, value } = event.target;
        const element = document.getElementById(id);
        const error_elm = document.getElementById('error_elm')
        error_elm.classList.add("hidden")



        function InitialState() {

            element.classList.remove('error');
            element.style.border = "0";

        }
        InitialState();




        function showError(message = "") {

            element.style.border = "1px solid red";

            error_elm.classList.remove("hidden")
            error_elm.textContent = ""
            error_elm.textContent = message || 'Selected Field should not be empty'
        }


        if (!value) {

            showError();
            return;
        }


        if (id == "input_email" && !value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {

            showError(`Wrong Email format`)
            return;
        }


        if (id == "input_password" && value.length < 8) {
            showError(`Should be greater than 8 digits`);
            return;
        }


        //else send data
        getUserData(event.target);
    }


    return (

        <input

            id={inputId}
            name={inputName}
            className={`fira-sans-light px-3 py-4 my-2.5 outline-none ${customcss} rounded-md w-80 min-w-72 min-h-2
            `}
            type={input_type}
            placeholder={custom_placeholder}
            onChange={handleInput}
            required
            {...props}
        />


    )
}

export default Inputfield