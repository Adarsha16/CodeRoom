import React, { useEffect, useState } from 'react';
import Button from '../Button';
import { useSelector } from 'react-redux';

function LanguageSwitch({ handleLanguageSwitch, handleFileNameInputChange }) {

    // const roomData = useSelector(state => state.room.roomData);




    const buttons = [
        {
            label: <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" viewBox="0 0 256 255"><defs><linearGradient id="logosPython0" x1="12.959%" x2="79.639%" y1="12.039%" y2="78.201%"><stop offset="0%" stopColor="#387eb8" /><stop offset="100%" stopColor="#366994" /></linearGradient><linearGradient id="logosPython1" x1="19.128%" x2="90.742%" y1="20.579%" y2="88.429%"><stop offset="0%" stopColor="#ffe052" /><stop offset="100%" stopColor="#ffc331" /></linearGradient></defs><path fill="url(#logosPython0)" d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072M92.802 19.66a11.12 11.12 0 0 1 11.13 11.13a11.12 11.12 0 0 1-11.13 11.13a11.12 11.12 0 0 1-11.13-11.13a11.12 11.12 0 0 1 11.13-11.13" /><path fill="url(#logosPython1)" d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897m34.114-19.586a11.12 11.12 0 0 1-11.13-11.13a11.12 11.12 0 0 1 11.13-11.131a11.12 11.12 0 0 1 11.13 11.13a11.12 11.12 0 0 1-11.13 11.13" /></svg>,
            id: 'Python',
            extension: '.py'
        },
        {
            label: <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" viewBox="0 0 32 32"><path fill="#659ad2" d="M29 10.232a2.4 2.4 0 0 0-.318-1.244a2.45 2.45 0 0 0-.936-.879q-5.194-2.868-10.393-5.733a2.64 2.64 0 0 0-2.763.024c-1.378.779-8.275 4.565-10.331 5.706A2.29 2.29 0 0 0 3 10.231V21.77a2.4 2.4 0 0 0 .3 1.22a2.43 2.43 0 0 0 .954.9c2.056 1.141 8.954 4.927 10.332 5.706a2.64 2.64 0 0 0 2.763.026q5.19-2.871 10.386-5.733a2.44 2.44 0 0 0 .955-.9a2.4 2.4 0 0 0 .3-1.22V10.232" /><path fill="#00599c" d="M28.549 23.171a2 2 0 0 0 .147-.182a2.4 2.4 0 0 0 .3-1.22V10.232a2.4 2.4 0 0 0-.318-1.244c-.036-.059-.089-.105-.13-.16L16 16Z" /><path fill="#004482" d="M28.549 23.171L16 16L3.451 23.171a2.4 2.4 0 0 0 .809.72c2.056 1.141 8.954 4.927 10.332 5.706a2.64 2.64 0 0 0 2.763.026q5.19-2.871 10.386-5.733a2.4 2.4 0 0 0 .808-.719" /><path fill="#fff" d="M19.6 18.02a4.121 4.121 0 1 1-.027-4.087l3.615-2.073A8.309 8.309 0 0 0 7.7 16a8.2 8.2 0 0 0 1.1 4.117a8.319 8.319 0 0 0 14.411-.017z" /><path fill="#fff" d="M24.076 15.538h-.926v-.921h-.925v.921h-.926v.923h.926v.92h.925v-.92h.926zm3.473 0h-.926v-.921h-.926v.921h-.926v.923h.926v.92h.926v-.92h.926z" /></svg>,
            id: 'C++',
            extension: '.cpp'
        },
        {
            label: <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" viewBox="0 0 256 256"><path fill="#f7df1e" d="M0 0h256v256H0z" /><path d="m67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371c7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259c-19.245 0-30.416-9.967-36.087-21.996m85.07-2.576l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607c9.969 0 16.325-4.984 16.325-11.858c0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257c0-18.044 13.747-31.792 35.228-31.792c15.294 0 26.292 5.328 34.196 19.247l-18.732 12.03c-4.125-7.389-8.591-10.31-15.465-10.31c-7.046 0-11.514 4.468-11.514 10.31c0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804c0 21.654-17.012 33.51-39.867 33.51c-22.339 0-36.774-10.654-43.819-24.574" /></svg>,
            id: 'JS',
            extension: '.js'
        }
    ];

    const [isOpen, setOpen] = useState(false);
    const [selected, setSelected] = useState(buttons[2]);
    const [extension, setExtension] = useState(buttons[2].extension);

    const openMenu = () => {


        setOpen(!isOpen);

    }



    const handleClick = (button) => {

        console.log("button", button)

        handleLanguageSwitch(button)

        setSelected(button);
        setExtension(button.extension);
        setOpen(false);

    }

    return (
        <div className="relative  flex items-center justify-center ">
            <Button
                handleClick={openMenu}
                buttonLabel={selected.label}
                custom_class={`m-0 p-0`}
            />
            {
                isOpen && (
                    <div className="absolute flex flex-col items-center z-50  py-2 gap-2 w-30 px-2 bg-secondary  shadow-lg transition duration-300 ease-in-out transform origin-top rounded-full">
                        {buttons.filter(btn => btn.id !== selected.id).map((btn, index) => (
                            <Button
                                key={index}
                                buttonLabel={btn.label}
                                handleClick={() => handleClick(btn)}
                            />
                        ))}
                    </div>
                )}
            <div className=' px-2 relative'>
                <p>
                    <input
                        type='text'
                        className='w-20  bg-secondary focus:outline-none rounded-md opacity-50 font-base pl-1'
                        placeholder='index'
                        onBlur={handleFileNameInputChange}
                    >
                    </input>
                    <span className='absolute right-2 bottom-0 bg-secondary rounded-md overflow-hidden pr-2'>{extension}</span>
                </p>
            </div>
        </div>
    );
}

export default LanguageSwitch;
