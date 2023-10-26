import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    display : {
        genre_filter : [],
        year_filter : [],
        rating_filter : []
    },
    selected : {
        genre_filter : [],
        year_filter : [],
        rating_filter : []
    }
}

export const filterstore = createSlice({
    name:'filterstore',
    initialState,
    reducers:{
        setDisplayGenre : (state,action) =>{
            state.display.genre_filter = action.payload
        },
        setDisplayYear : (state,action) =>{
            state.display.year_filter = action.payload
        },
        setDisplayRating : (state,action) =>{
            state.display.rating_filter = action.payload
        },
        setSelectedGenre : (state,action) =>{
            state.selected.genre_filter = action.payload
        },
        setSelectedYear : (state,action) =>{
            state.selected.year_filter = action.payload
        },
        setSelectedRating : (state,action) =>{
            state.selected.rating_filter = action.payload
        }
    }
})
export const {setDisplayGenre,setDisplayRating,setDisplayYear,setSelectedGenre,setSelectedYear,setSelectedRating} = filterstore.actions

export default filterstore.reducer;