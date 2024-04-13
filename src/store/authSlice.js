import { createSlice } from "@reduxjs/toolkit"


/**
 * 
 * 3 > after store calling root reducer, and saves the return value as its initial value
 * 4 > UI on rendering it access current state of the redux store
 *  
 */

// Inital value/ state
const initialState = {

    loginStatus: false,
    userData: null,

};


const authSlice = createSlice({

    name: 'auth', // name of slice
    initialState, //inital value

    // functions
    reducers: {

        login: (state, action) => {

            state.loginStatus = true,
                state.userData = action.payload.userData
        },


        logout: (state, action) => {

            state.loginStatus = false,
                state.userData = null
        }

    }
});


export default authSlice;
export const { login, logout } = authSlice.actions;

