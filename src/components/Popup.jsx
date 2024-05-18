import React, { useEffect, useState } from 'react'
import Input from './Inputfield.jsx'
import Button from './Button.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { setRoomClick } from '../store/roomSlice.js'

const Popup = ({ Title, Paragraph, custom_placeholder }) => {

    const roomClick = useSelector(state => state.room.roomClick)
    console.log("home", roomClick)

    const [roomid, setRoomId] = useState("");
    const [open, setOpen] = useState(true);
    const [roomAction, setRoomAction] = useState(true);

    const dispatch = useDispatch();


    useEffect(() => {

        dispatch(setRoomClick(open))

    }, [open])

    return (
        !open ? "" : roomAction ? (

            < div className='flex justify-center items-center' >

                <div className='p-10 bg-slate-700 text-white gap-1 w-max h-max rounded-md absolute right-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center flex-col drop-shadow-2xl '>

                    <span className='text-3xl rotate-45 font-mono fixed right-3 top-3 cursor-pointer border-0 p-2 rounded-full hover:bg-tertiary hover:text-2xl' onClick={() => { setOpen(false) }}>+</span>

                    <h1 className='font-bold text-4xl'>{Title}</h1>
                    <p>{Paragraph}</p>

                    <Input

                        type={'text'}
                        custom_placeholder={custom_placeholder}
                        name={'room'}
                        value={roomid}
                        handleChanges={(e) => { setRoomId(e.target.value) }}
                    />

                    <Button
                        buttonLabel={'Create Room'}
                        custom_class='py-3 w-80 bg-signupBTN text-white item-center mt-4 font-semibold hover:bg-blue_hover  rounded-sm'
                        type={"submit"}

                    />

                    <p className='pt-2 text-sm'>Already have a room? <button className='font-bold underline' onClick={() => { setRoomAction(!roomAction) }}>Join Here</button></p>
                </div>
            </div >

        ) : (

            < div className='flex justify-center items-center' >

                <div className='p-10 bg-slate-700 text-white gap-1 w-max h-max rounded-md absolute right-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center flex-col drop-shadow-2xl '>

                    <span className='text-3xl rotate-45 font-mono fixed right-3 top-3 cursor-pointer border-0 p-2 rounded-full hover:bg-tertiary hover:text-2xl' onClick={() => { setOpen(false) }}>+</span>

                    <h1 className='font-bold text-4xl'>{Title}</h1>
                    <p>{Paragraph}</p>

                    <Input

                        type={'text'}
                        custom_placeholder={custom_placeholder}
                        name={'room'}
                        value={roomid}
                        handleChanges={(e) => { setRoomId(e.target.value) }}
                    />

                    <Button
                        buttonLabel={'Join Room'}
                        custom_class='py-3 w-80 bg-signupBTN text-white item-center mt-4 font-semibold hover:bg-blue_hover  rounded-sm'
                        type={"submit"}

                    />

                    <p className='pt-2 text-sm'>Don't have a room? <button className='font-bold underline' onClick={() => setRoomAction(!roomAction)}>Create room Here</button></p>
                </div>
            </div >

        )
    );
}

export default Popup