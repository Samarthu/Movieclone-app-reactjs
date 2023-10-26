import { createSlice } from "@reduxjs/toolkit";

let initialState =  []

export const genre = createSlice(
    {
        name:'genre_store',
        initialState,
        reducers:
        {
            updateGenre : (state,action) =>{
                return action.payload
            }
        }
    }
)

export const {updateGenre} = genre.actions
export default genre.reducer