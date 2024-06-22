import React, { useEffect } from 'react';
import Explore from './Home-components/Explore.jsx';
import { Textbox } from './Home-components/Textbox.jsx';
import Popup from './Popup.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store/authSlice.js';
import callGetUser from "../custom_fn/callGetUser.js";
import { selectModeClick } from '../store/modeSlice.js';

function HomeComp() {
    const roomClick = useSelector(state => state.room.roomClick);
    const dispatch = useDispatch();
    let isVertical = useSelector(selectModeClick);

    useEffect(() => {
        const ifLoggedInToken = localStorage.getItem("token");

        if (ifLoggedInToken) {
            async function GetUser() {
                const response = await callGetUser(ifLoggedInToken);

                let data = response;
                if (!response) {
                    console.log("Error", response);
                    return;
                }
                dispatch(
                    login({
                        token: ifLoggedInToken, data
                    })
                );
            }
            GetUser();
        }
    }, [dispatch]);

    return (
        <div className={`w-full fixed grid gap-0 ${isVertical ? 'grid-flow-col grid-cols-5 grid-rows-1' : 'grid grid-cols-5 grid-rows-6'}`}>
            <Explore
                _grid={isVertical ? 'col-start-1 col-end-2' : 'col-start-1 col-end-2 row-span-6'}
            />
            <>
                <Textbox
                    type={"input"}
                    customcss={{ flex_alignment: "justify-between" }}
                    textarea_id={"inputarea"}
                    textarea_name={"inputarea"}
                    disabled={false}
                    custom_theme={'vs-dark'}
                    _grid={`${isVertical ? 'col-start-2 col-end-4' : 'col-start-2 col-end-6 row-start-1 row-end-3'}`}
                />
                <Textbox
                    type={"output"}
                    customcss={{ flex_alignment: "" }}
                    textarea_id={"outputarea"}
                    textarea_name={"outputarea"}
                    disabled={true}
                    custom_theme={'vs-dark'}
                    _grid={`${isVertical ? 'col-start-4 col-end-6' : 'col-start-2 col-end-6 row-start-2 row-end-5'}`}
                />
            </>


            {roomClick && <Popup />}
        </div>
    );
}

export default HomeComp;
