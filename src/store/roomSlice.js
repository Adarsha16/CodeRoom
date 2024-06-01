import { createSlice } from "@reduxjs/toolkit"

const initialState = {

    roomClick: false,
    roomStatus: false,
    roomData: null,
    inputField: null
}


const roomSlice = createSlice({

    name: 'room',
    initialState,

    reducers: {

        enterRoom: (state, action) => {

            const { roomData, inputField } = action.payload
            state.roomStatus = true;
            state.roomData = roomData
        },

        setInputField: (state, action) => {

            const { inputField } = action.payload;
            state.inputField = inputField;
        },

        leaveRoom: (state, action) => {

            state.roomStatus = false;
            // state.roomData = null;
            state.inputField = null;

        },

        setRoomClick: (state, action) => {

            // const { roomClick } = action.payload;
            // console.log(action.payload)
            // console.log("payload", roomClick)
            console.log("payload", state.roomClick)
            state.roomClick = action.payload
            console.log("after payload", state.roomClick)
        }

    }

});

export default roomSlice.reducer;
export const { enterRoom, leaveRoom, setInputField, setRoomClick } = roomSlice.actions;
