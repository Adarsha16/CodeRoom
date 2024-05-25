import React from "react";


function Button({ buttonLabel, type = "button", handleClick, custom_class, props = "" }) {

    return (
        <>
            <button
                type={type}
                className={`${custom_class} item-center font-semibold `}
                {...props}
                onClick={handleClick}
            >
                {buttonLabel}
            </button>
        </>
    )
}

export default Button;