import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice.js"
import roomSlice from "./roomSlice.js"


/**
 * 1 > store is created,
 * 2 > store calls the root reducer once, and saves the return value as its initial value
 *  
 */

//this is store for common place to manipulate the state.
const store = configureStore({


    //reducer is a function, receives state, action, decide how to change the state if necessary, and returns the new state.
    reducer: {
        auth: authSlice,
        room: roomSlice
    }

})

export default store