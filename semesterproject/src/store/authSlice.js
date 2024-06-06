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
    token: null


};


const authSlice = createSlice({

    name: 'auth', // name of slice
    initialState, //inital value

    // functions
    reducers: {


        login: (state, action) => {


            const { token, data = "" } = action.payload;

            state.loginStatus = true;
            state.token = token;
            state.userData = data;

            console.log("Logged in state : ", state.userData, state.token)

        },




        logout: (state, action) => {

            state.loginStatus = false;
            state.userData = null;
            state.token = null;
        }

    }
});


export default authSlice.reducer;
export const { login, logout, token } = authSlice.actions;

