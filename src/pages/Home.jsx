import React from 'react'
import Explore from '../components/Home-components/Explore'
import { Textbox } from '../components/Home-components/Textbox'

function Home() {
    return (
        <div className='fixed  grid grid-flow-col col-span-5 grid-rows-1 gap-0 w-full'>


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
            />
        </div>
    )
}

export default Home

