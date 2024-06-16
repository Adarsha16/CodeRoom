import React, { useEffect } from 'react';
import Explore from '../components/Home-components/Explore';
import { TextboxMODE } from '../components/Home-components/TextboxMODE.jsx';
import Popup from '../components/Popup';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store/authSlice.js';
import callGetUser from "../custom_fn/callGetUser.js";

function Mode() {
  const roomClick = useSelector(state => state.room.roomClick);
  const dispatch = useDispatch();

  useEffect(() => {
    const ifLoggedInToken = localStorage.getItem("token");

    if (ifLoggedInToken) {
      async function GetUser() {
        const response = await callGetUser(ifLoggedInToken);
        if (!response) {
          console.log("Error", response);
          return;
        }
        dispatch(login({
          token: ifLoggedInToken, data: response
        }));
      }
      GetUser();
    }
  }, []);

  return (
    <div className='fixed grid grid-cols-5 grid-rows-6 gap-0 w-full h-full'>
      <Explore _grid={'col-start-1 col-end-2 row-span-6 '} />

      {/* Input Text */}
      <TextboxMODE
        type={"input"}
        customcss={{ flex_alignment: "justify-between" }}
        textarea_id={"inputarea"}
        textarea_name={"inputarea"}
        disabled={false}
        custom_theme={'vs-dark'}
        _grid={'col-start-2 col-end-6 row-start-1 row-end-3'}
      />

      

      {/* Output Text */}
      <TextboxMODE
        type={"output"}
        customcss={{ flex_alignment: "" }}
        textarea_id={"outputarea"}
        textarea_name={"outputarea"}
        disabled={true}
        custom_theme={'vs-dark'}
        _grid={'col-start-2 col-end-6 row-start-4 row-end-5'}
      />

      {!roomClick ? "" : <Popup />}
    </div>
  );
}

export default Mode;
