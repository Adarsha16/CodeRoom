import { createSlice, createAction } from "@reduxjs/toolkit"

const initialState = {

    modeClick: false
}

const modeSlice = createSlice({
    name: 'mode',
    initialState,

    reducers: {
        clickButton: (state, action) => {
            state.modeClick = action.payload;
        }
    }
})

export default modeSlice.reducer;
export const selectModeClick = state => state.mode.modeClick;
export const { clickButton } = modeSlice.actions;