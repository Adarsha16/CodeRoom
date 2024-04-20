import React from "react";

export default function Input() {
    return (
        <>
            <div class="flex flex-col h-screen w-1/2 border border-black no-scrollbar overflow-hidden">
                <textarea class="flex-grow border-none focus:outline-none bg-transparent p-4" placeholder="Input"></textarea>
            </div>

        </>
    )
}
