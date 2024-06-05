import React from 'react'
import Explore from '../components/Home-components/Explore'
import { Textbox } from '../components/Home-components/Textbox'
import Popup from '../components/Popup'
import { useSelector } from 'react-redux'


function Home() {

    const roomClick = useSelector(state => state.room.roomClick)


    return (
        <div className='fixed grid grid-flow-col grid-cols-5 grid-rows-1 gap-0 w-full '>


            <Explore
                _grid={'col-start-1 col-end-2'}
            />

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
                _grid={'col-start-2 col-end-4'}

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
                _grid={'col-start-4 col-end-6'}
            />


            {!roomClick ? "" : <Popup />}



        </div>

    )
}

export default Home

