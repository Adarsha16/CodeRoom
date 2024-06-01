import { createSlice } from "@reduxjs/toolkit"

const initalState = {

    roomStatus: false,
    roomData: null,
    inputField: null
}


const roomSlice = createSlice({

    name: 'room',
    initalState,

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

        }

    }

});

export default roomSlice.reducer;
export const { enterRoom, leaveRoom, setInputField } = roomSlice.actions;