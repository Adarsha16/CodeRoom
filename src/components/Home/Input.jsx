import React from "react";

export default function Input() {
    return (
        <>
            <div class="flex flex-col  h-[calc(100vh-24px)] w-1/2 border border-black">
                <textarea class="flex-grow border-none focus:outline-none bg-transparent p-4" placeholder="Input"></textarea>
            </div>

        </>
    )
}
