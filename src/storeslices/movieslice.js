
import { createSlice } from "@reduxjs/toolkit";

let initialState = [];

export const movies = createSlice({
  name: "movieslist",
  initialState,
  reducers: {
    updateMovies: (state, action) => {
      // Update the state with the new value
      return action.payload;
    },
    setWatchListTrue: (state,action) => {
        return state.map((movie) => {
            if (movie.id === action.payload.id) {
              return { ...movie, watchlist: 1 };
            }
            return movie;
          });
    },
    setWatchListFalse: (state,action) => {
        return state.map((movie) => {
            if (movie.id === action.payload.id) {
              return { ...movie, watchlist: 0 };
            }
            return movie;
        });
    },
    // Filter Movies According To Selected Filters
    updateMoviesByFilters:(state,action) => {
      let genre_filter = action.payload.genre_filter
      let year_filter = action.payload.year_filter
      let rating_filter = action.payload.rating_filter
      let backup = action.payload.backup
      const check_two_arrays = (arr1,arr2)=>{
         return arr1.some((d)=>arr2.includes(d))
      }
      if( !genre_filter && !year_filter && !rating_filter) {
        return state;
      }
      return backup.filter((movie) => (
        (genre_filter.length? check_two_arrays(movie.genre_ids,genre_filter) : true) &&  (year_filter.length? year_filter.includes(movie.release_date.split("-")[0]) : true)
        && (rating_filter.length ? rating_filter.includes(parseInt(movie.vote_average)):true)
      ))
    }
  },
});

// Export the action creator
export const { updateMovies ,setWatchListTrue, setWatchListFalse,updateMoviesByFilters} = movies.actions;

export default movies.reducer;
