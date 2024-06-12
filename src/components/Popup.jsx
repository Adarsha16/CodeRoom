import React, { useEffect, useState } from 'react'
import Input from './Inputfield.jsx'
import Button from './Button.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { setRoomClick, setRoomData, setRoomStatus } from '../store/roomSlice.js'


const Popup = () => {

    const roomClick = useSelector(state => state.room.roomClick)
    console.log("home", roomClick)

    const [roomid, setRoomId] = useState("");
    const [open, setOpen] = useState(true);

    const dispatch = useDispatch();

    const handleClick = (e) => {

        e.preventDefault();

        if (!roomid) {
            e.target.style.border = '2px solid red';
            return;
        }

        e.target.style.border = '0px';
        dispatch(setRoomData({ roomid }));
        dispatch(setRoomStatus(true));

        setOpen(false)
    };


    useEffect(() => {

        dispatch(setRoomClick(open));

    }, [open])

    return (
        !open ? "" : (

            < div className='flex justify-center items-center ' >

                <div className='p-10 bg-slate-700 text-white gap-1 w-max h-max rounded-md absolute right-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center flex-col drop-shadow-2xl bg-opacity-50 backdrop-blur-sm '>

                    <span className='text-3xl rotate-45 font-mono fixed right-3 top-3 cursor-pointer border-0 p-2 rounded-full hover:bg-tertiary hover:text-2xl' onClick={() => { setOpen(false) }}>+</span>
                    <h1
                        className='font-bold text-4xl'
                    >
                        Room
                    </h1>
                    <p>
                        Enter a room id to initialize room
                    </p>
                    <Input

                        type={'text'}
                        custom_placeholder=
                        {
                            "Room ID"
                        }
                        name={'room'}
                        value={roomid}
                        handleChanges={(e) => { setRoomId(e.target.value) }}
                    />
                    {/* Language selection part */}
                    <div className=''>
                        <label>Select a Language: </label>
                        <select className='bg-black px-8 py-1 rounded-sm hover:bg-slate-700'>
                            <option>JavaScript</option>
                            <option>C++</option>
                            <option>Python</option>

                        </select>
                    </div>

                    <Button
                        buttonLabel={'Initialize Room'}
                        custom_class='py-3 w-80 bg-signupBTN text-white item-center mt-4 font-semibold hover:bg-blue_hover rounded-sm'
                        type={"submit"}
                        handleClick={handleClick}

                    />
                </div>
            </div >

        )
    );
}

export default Popup