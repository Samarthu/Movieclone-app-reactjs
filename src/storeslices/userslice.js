import { createSlice } from "@reduxjs/toolkit";

let initialState = []

export const user = createSlice({
    name:'userstore',
    initialState,
    reducers:{
        setUser : (state,action) => {
            return action.payload
        }
    }
})

export const {setUser} = user.actions;

export default user.reducer;