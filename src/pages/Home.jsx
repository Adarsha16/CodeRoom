import React from 'react'
import Explore from '../components/Home-components/Explore'
import { Textbox } from '../components/Home-components/Textbox'
import Popup from '../components/Popup'
import { useSelector } from 'react-redux'

function Home() {

    const roomClick = useSelector(state => state.room.roomClick)
    console.log("home", roomClick)

    return (
        <div className='fixed  grid grid-flow-col col-span-5 grid-rows-1 gap-0 w-full '>


            <Explore />



            {/* <Input Text /> */}
            <Textbox

                type={"input"}
                customcss={
                    {

                        flex_alignment: "justify-between"
                    }
                }

                textarea_id={"inputarea"}
                textarea_name={"inputarea"}
                disabled={false}
                placeholder={"//Some comment"}
                default_lng={'python'}
                custom_theme={'vs-dark'}

            />




            {/* <Output Text/> */}
            <Textbox

                type={"output"}
                customcss={
                    {

                        flex_alignment: ""
                    }
                }

                textarea_id={"outputarea"}
                textarea_name={"outputarea"}
                disabled={true}
                placeholder={"Output"}
                default_lng={'python'}
                custom_theme={'vs-dark'}
            />


            {!roomClick ? "" : <Popup
                Title="Room"
                Paragraph="Please enter your room id to join"
                custom_placeholder="Room Name"
                DoWhat="Create Room"
            />}



        </div>

    )
}

export default Home

