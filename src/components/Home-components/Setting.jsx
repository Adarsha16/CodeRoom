import React, { useState } from "react";
import Button from "./Button";

function Setting() {

    const [isOpen, setOpen] = useState(false);

    const openMenu = () => {
        setOpen(!isOpen);
    }

    return (
        <>
            <div className="relative mr-5" >
                <Button
                    paddingX={2}
                    handleClick={openMenu}
                    buttonLabel={
                        <svg xmlns="http://www.w3.org/2000/svg"
                            width="28px"
                            height="28px"
                            viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19.5 12c0-.23-.01-.45-.03-.68l1.86-1.41c.4-.3.51-.86.26-1.3l-1.87-3.23a.987.987 0 0 0-1.25-.42l-2.15.91c-.37-.26-.76-.49-1.17-.68l-.29-2.31c-.06-.5-.49-.88-.99-.88h-3.73c-.51 0-.94.38-1 .88l-.29 2.31c-.41.19-.8.42-1.17.68l-2.15-.91c-.46-.2-1-.02-1.25.42L2.41 8.62c-.25.44-.14.99.26 1.3l1.86 1.41a7.343 7.343 0 0 0 0 1.35l-1.86 1.41c-.4.3-.51.86-.26 1.3l1.87 3.23c.25.44.79.62 1.25.42l2.15-.91c.37.26.76.49 1.17.68l.29 2.31c.06.5.49.88.99.88h3.73c.5 0 .93-.38.99-.88l.29-2.31c.41-.19.8-.42 1.17-.68l2.15.91c.46.2 1 .02 1.25-.42l1.87-3.23c.25-.44.14-.99-.26-1.3l-1.86-1.41c.03-.23.04-.45.04-.68m-7.46 3.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5" />
                        </svg>
                    }
                />

                {isOpen && (
                    <div className="absolute flex flex-col z-50 mt-2 p-3 gap-4 w-56 right-0 bg-secondary border border-gray-200 rounded shadow-lg transition duration-300 ease-in-out transform origin-top ">
                        <Button buttonLabel={'Preference'} />
                        <Button buttonLabel={'Contacts'} />
                        <Button buttonLabel={'About Us'} />
                    </div>
                )

                }
            </div>
        </>
    );
}


export default Setting;

