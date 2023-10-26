import { configureStore } from "@reduxjs/toolkit";

import movieslice from "../storeslices/movieslice";
import userslice from "../storeslices/userslice";
import watchlistslice from "../storeslices/watchlistslice";
import genreslice from "../storeslices/genreslice";
import filterSlice from "../storeslices/filterSlice";
export const store = configureStore({
    reducer:{
        movieslist : movieslice,
        userstore : userslice, 
        watchliststore:watchlistslice,
        genre_store:genreslice,
        filterstore:filterSlice
    }
})