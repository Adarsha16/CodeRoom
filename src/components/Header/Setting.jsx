import React, { useState } from "react";
import Button from "../Button.jsx";
import '../../App.css';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import emailjs from 'emailjs-com';

function Setting() {
    const loginStatus = useSelector(state => state.auth.loginStatus)
    const [isOpen, setOpen] = useState(false);
    const [isTilted, setIsTilted] = useState(false);
    const [isPreferenceOpen, setPreferenceOpen] = useState(false);
    const [popupContent, setPopupContent] = useState(null);
    const [changepage, setchangepage] = useState(false);
    const [reportContent, setReportContent] = useState('');
    const [reportEmail, setReportEmail] = useState('');
    const [isReportPopupOpen, setReportPopupOpen] = useState(false);
    const navigate = useNavigate();

    const openMenu = () => {
        setOpen(!isOpen);
        setIsTilted(true);
        setPreferenceOpen(false);
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

    const Handlelogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        window.location.reload();
    }

    const handleReportClick = () => {
        setReportPopupOpen(true);
    };

    const closeReportPopup = () => {
        setReportPopupOpen(false);
        setReportContent('');
        setReportEmail('');
    };

    const handleSendReport = () => {
        if (reportEmail && reportContent) {
            emailjs.send('service_d0mqmni', 'template_llp76vz', {
                to_email: 'adarshapant350@gmail.com', //  your email address (of developer)
                from_email: reportEmail,
                message: reportContent,
            }, 'JOqRMVlQFwtkby774')
                .then((response) => {
                    console.log('SUCCESS!', response.status, response.text);
                }, (error) => {
                    console.log('FAILED...', error);
                });
            closeReportPopup();
        } else {
            alert("Please enter both email and report content.");
        }
    };

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
                <div className={`absolute flex flex-col z-50 mt-2 gap-2 w-52 right-0 bg-secondary border border-gray-200 rounded shadow-lg transition duration-300 ease-in-out transform origin-top ${popupContent ? 'blur' : ''}`}>
                    <Button buttonLabel={'Preference'} handleClick={togglePreference} custom_class={'hover:bg-primary rounded-sm mt-2'} />

                    {isPreferenceOpen && (
                        <div className="absolute flex flex-col z-50 mt-4 h-10 p-1 gap-1 w-52 right-40 bg-secondary border border-gray-200  shadow-lg transition duration-300 ease-in-out transform origin-top hover:bg-primary rounded-sm">
                            <Button buttonLabel={'Modes'} handleClick={() => {
                                changepage ? navigate("/mode_vertical") : navigate("/");
                                setchangepage(!changepage);
                            }} />
                        </div>
                    )}

                    <Button buttonLabel={'Contacts'} handleClick={() => showPopup('Contacts')} />
                    <Button buttonLabel={'About Us'} handleClick={() => showPopup('About Us')} />
                    <Button buttonLabel={'Report '} handleClick={handleReportClick} />

                    {loginStatus
                        ? <Button
                            buttonLabel={'Logout'}
                            custom_class={'border-t-[2px] py-2 border-brown'}
                            handleClick={Handlelogout}
                        />
                        : ""}
                </div>}

            {popupContent && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 "></div>
                    <div className="fixed inset-0 flex items-center justify-center z-50 text-black">
                        <div className="bg-white p-6 rounded shadow-lg w-96">
                            <h2 className="text-2xl mb-4">{popupContent}</h2>
                            <p>
                                {popupContent === 'Contacts'
                                    ? <>
                                      
                                        <a className="hover-effect" href="https://github.com/Adarsha16" target="_blank" rel="noopener noreferrer">Adarsha Pant</a><br />
                                        <a className="hover-effect" href="https://github.com/XGPher35" target="_blank" rel="noopener noreferrer">Arjit Chand</a><br />
                                        <a className="hover-effect" href="https://github.com/Pranaya-sht" target="_blank" rel="noopener noreferrer">Pranaya Shrestha</a><br />
                                        <a className="hover-effect" href="https://github.com/ostrich-egg" target="_blank" rel="noopener noreferrer">Sauhardha Kafle</a><br />
                                        <br />
                                        <em>"Alone, we can do so little; together we can do so much."</em>
                                    </>
                                    : <>
                                        A Collaborative University Project by:<br />
                                        Adarsha, Arjit, Pranaya, and Sauhardha<br />
                                        <br />
                                        Copyright © Code Room, 2024<br />
                                        <br />
                                        <em>"Never Gonna Give You Up, Never Gonna Let you Go"</em>
                                    </>}
                            </p>
                            <button className="mt-4 px-4 py-2 bg-primary text-white rounded" onClick={closePopup}>Close</button>
                        </div>
                    </div>
                </>
            )}

            {isReportPopupOpen && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"></div>
                    <div className="fixed inset-0 flex items-center justify-center z-50 text-black">
                        <div className="bg-white p-6 rounded shadow-lg w-96">
                            <h2 className="text-2xl mb-4">Report</h2>
                            <textarea
                                className="w-full p-2 border border-gray-300 rounded"
                                rows="4"
                                value={reportContent}
                                onChange={(e) => setReportContent(e.target.value)}
                                placeholder="Report here..."
                            ></textarea>
                            <input
                                type="email"
                                className="w-full p-2 mt-4 border border-gray-300 rounded"
                                value={reportEmail}
                                onChange={(e) => setReportEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                            <div className="mt-4 flex justify-end ">
                                <button className="px-4 py-2 bg-primary text-white rounded" onClick={handleSendReport}>Send</button>
                                <button className="px-4 py-2 bg-primary text-white rounded" onClick={closeReportPopup}>Close</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Setting;
