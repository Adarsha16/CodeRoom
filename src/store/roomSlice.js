import { createSlice } from "@reduxjs/toolkit"

const initalState = {

    roomStatus: false,
    userData: null
}


const roomSlice = createSlice({

    name: 'room',
    initalState,

    reducers: {

        enterRoom: (state, action) => {

            state.roomStatus = true,
                state.userData = action.payload.userData
        },

        leaveRoom: (state, action) => {

            state.roomStatus = false,
                state.userData = action.payload.userData
        }

    }

});

export default roomSlice.reducer;
export const { enterRoom, leaveRoom } = roomSlice.actions;