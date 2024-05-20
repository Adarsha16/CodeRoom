import React from "react";
import { useState } from "react";

function Button({ buttonLabel, handleClick, custom_class }) {

    return (
        <>
            <button
                type="button"
                className={`${custom_class} item-center font-semibold `}
                onClick={handleClick}>
                {buttonLabel}

            </button>
        </>
    )
}

export default Button;