import { createSlice } from "@reduxjs/toolkit";


let initialState = []

export const watchlist = createSlice({
    name:'watchliststore',
    initialState:[],
    reducers:{
        setWatchList : (state,action) => {
            return action.payload
        },
        addToWatchList: (state,action) =>{
            //console.log(state.watchliststore)
            //state.watchliststore =  [...state.watchliststore,{...action.payload}]
            let flag = true;
            state.forEach((d)=> {
                if(d.id === action.payload.id) {
                    flag = false
                }
            })
            if(flag){
                state.push({ ...action.payload });
            }
        },
        removeFromWatchList:(state,action) =>{
           // state.watchliststore = state.watchliststore.filter((d)=>d.id !== action.payload.id)
           return state.filter((item) => item.id !== action.payload.id);
        }
    }
})

export const  {setWatchList,addToWatchList,removeFromWatchList} = watchlist.actions;
export default watchlist.reducer;