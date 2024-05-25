import React from "react";


function Button({ buttonLabel, handleClick, custom_class, handleSubmit, props = "" }) {

    return (
        <>
            <button
                type="button"
                className={`${custom_class} item-center font-semibold `}
                onClick={handleSubmit}>
                {buttonLabel}

                {...props}


            </button>
        </>
    )
}

export default Button;