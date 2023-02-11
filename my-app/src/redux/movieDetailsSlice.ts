import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { IMovieItem } from './moviesSlice'

interface IMovieInfo {
  [key: string]: string
}

export interface IMovieDetails extends IMovieItem {
  info: IMovieInfo
}

interface IMovieDetailsState {
  movieItem: IMovieDetails | null
  moviesRecommend: IMovieItem[]
}

const initialState: IMovieDetailsState = {
  movieItem: null,
  moviesRecommend: [],
}

export const fetchMovieById = createAsyncThunk<
  IMovieDetails,
  string,
  { rejectValue: string }
>('movies/movieId', async (movieId, thunkAPI) => {
  try {
    const response = await fetch(`http://localhost:5000/api/movies/${movieId}`)

    if (!response.ok) {
      throw new Error('Server Error')
    }

    const json = await response.json()
    return json
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const fetchMoviesRecommend = createAsyncThunk<
  IMovieItem[],
  undefined,
  { rejectValue: string }
>('movies/recommend', async (_, thunkAPI) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/movies?trends=1&page=1`
    )

    if (!response.ok) {
      throw new Error('Server Error')
    }

    const json = await response.json()
    return json.rows
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovieById.fulfilled, (state, action) => {
      state.movieItem = action.payload
    })
    builder.addCase(fetchMovieById.rejected, (state, action) => {
      alert(action.payload)
    })
    builder.addCase(fetchMoviesRecommend.fulfilled, (state, action) => {
      state.moviesRecommend = action.payload
    })
    builder.addCase(fetchMoviesRecommend.rejected, (state, action) => {
      alert(action.payload)
    })
  },
})

export default movieDetailsSlice.reducer
