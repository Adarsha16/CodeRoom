import React from 'react'
import Explore from '../components/Home-components/Explore'
import { Textbox } from '../components/Home-components/Textbox'

function Home() {
    return (
        <div className='w-screen fixed grid grid-flow-col grid-cols-6 grid-rows-1 gap-0 '>


            <Explore />

            {/* <Input Text/> */}
            <Textbox

                type={"input"}
                customcss={
                    {
                        colstart: "2",
                        colend: "5",
                        flex_alignment: "justify-between"
                    }
                }

                textarea_id={"inputarea"}
                textarea_name={"inputarea"}
                disabled={false}

            />


            {/* <Output Text/> */}
            <Textbox

                type={"output"}
                customcss={
                    {
                        colstart: "5",
                        colend: "7",
                        flex_alignment: ""
                    }
                }

                textarea_id={"outputarea"}
                textarea_name={"outputarea"}
                disabled={true}
            />
        </div>
    )
}

export default Home