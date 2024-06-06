import React from "react";


function Button({ buttonLabel, type = "button", handleClick, custom_class, props = "", id }) {

    return (
        <>
            <button
                type={type}
                className={`${custom_class} item-center font-semibold `}
                {...props}
                onClick={handleClick}
                id={id}
            >
                {buttonLabel}
            </button>
        </>
    )
}

export default Button;