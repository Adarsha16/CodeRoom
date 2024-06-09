import React, { useState } from "react";
import Button from "../Button.jsx";
import '../../App.css';
import { useNavigate } from "react-router-dom";

function Setting() {
    const [isOpen, setOpen] = useState(false);
    const [isTilted, setIsTilted] = useState(false);
    const [isPreferenceOpen, setPreferenceOpen] = useState(false);
    const [popupContent, setPopupContent] = useState(null);
    const [changepage, setchangepage] = useState(false);
    const navigate = useNavigate();

    const openMenu = () => {
        setOpen(!isOpen);
        setIsTilted(true);
        setTimeout(() => {
            setIsTilted(false);
        }, 200); // Reset the tilt effect after 200ms
    };


    const togglePreference = () => {
        setPreferenceOpen(!isPreferenceOpen);
    };

    const showPopup = (content) => {
        setPopupContent(content);
    };

    const closePopup = () => {
        setPopupContent(null);
    };


    const Handlelogout = () => {

        localStorage.removeItem('token');
        window.location.reload();
    }

    return (
        <div className="relative mr-5">
            <Button
                custom_class={`px-2 ${isTilted ? 'tilt' : ''}`}
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
            {isOpen &&
                <div className={`absolute flex flex-col z-50 mt-2 p-3 gap-4 w-56 right-0 bg-secondary border border-gray-200 rounded shadow-lg transition duration-300 ease-in-out transform origin-top ${popupContent ? 'blur' : ''}`}>
                    <Button buttonLabel={'Preference'} handleClick={togglePreference} />

                    {isPreferenceOpen && (
                        <div className="absolute flex flex-col z-50 mt-2 p-3 gap-1 w-56 right-40 bg-secondary border border-gray-200 rounded shadow-lg transition duration-300 ease-in-out transform origin-top">
                            <Button buttonLabel={'Modes'} handleClick={() => {


                                changepage ? navigate("/Mode_horizontal") : navigate("/");
                                setchangepage(!changepage);
                            }} />

                        </div>
                    )}


                    <Button buttonLabel={'Contacts'} handleClick={() => showPopup('Contacts')} />
                    <Button buttonLabel={'About Us'} handleClick={() => showPopup('About Us')} />


                    {/**
                     * When user logout
                     */}
                    <Button
                        buttonLabel={'Logout'}
                        custom_class={'border-t-[2px] pt-3 border-brown'}
                        handleClick={Handlelogout}
                    />


                </div>}

            {popupContent && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 "></div>

                    <div className="fixed inset-0 flex items-center justify-center z-50 text-black">

                        <div className="bg-white p-6 rounded shadow-lg w-96">
                            <h2 className="text-2xl mb-4">{popupContent}</h2>
                            <p>{popupContent === 'Contacts' ? 'Here are the contact details...' : 'About Us details go here...'}</p>
                            <button className="mt-4 px-4 py-2 bg-primary text-white rounded" onClick={closePopup}>Close</button>
                        </div>

                    </div>
                </>
            )}
        </div>

    );
}

export default Setting;
