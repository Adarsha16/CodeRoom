import React from 'react'
import Explore from '../components/Home/Explore'
import Input from '../components/Home/Input'
import Output from '../components/Home/Output'

function Home() {
    return (
        <>
            <main>
                <div className="flex flex-row no-scrollbar scrollbar-gutter-stable my-0">
                    <Explore />
                    <Input />
                    <Output />
                </div>
            </main>

        </>
    )
}

export default Home