import React from 'react'
import Input from "../components/Home/Input"
import Output from '../components/Home/Output'
import Explore from '../components/Home/Explore'

function Home() {
    return (
        <div className='w-full fixed grid grid-flow-col grid-cols-5 grid-rows-1 gap-0 '>


            <Explore />
            <Input />
            <Output />


        </div>
    )
}

export default Home