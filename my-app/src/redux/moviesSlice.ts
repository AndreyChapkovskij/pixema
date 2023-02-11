import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import { ICountry } from './countrySlice'
import { IGenres } from './genresSlice'
import { IFilter } from './filterSlice'

import { getQueryString } from '../helpers/redux'

export interface IMovieItem {
  id: number
  title: string
  rating: string
  img: string
  imdb: string
  duration: number
  description: string
  year: number
  trends: number
  genres: IGenres[]
  country: ICountry[]
}

interface IMovieResponse {
  count: number
  page: number
  limit: number
  rows: IMovieItem[]
}

interface IMoviesParams {
  filter: IFilter
  currentPage: number
  search: string
  favoriteItemsId?: number[]
}

interface IMoviesState {
  totalPages: number
  movieItems: IMovieItem[]
  loading: boolean
  favoriteItemsId: number[]
}

const initialState: IMoviesState = {
  totalPages: 0,
  movieItems: [],
  loading: false,
  favoriteItemsId: JSON.parse(localStorage.getItem('favoriteItems') || '[]'),
}

// Get all movies
export const fetchMovies = createAsyncThunk<
  IMovieResponse,
  IMoviesParams,
  { rejectValue: string }
>('movies/movieItems', async ({ filter, currentPage, search }, thunkAPI) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/movies?page=${currentPage}${getQueryString(
        filter,
        search
      )}`
    )

    if (!response.ok) {
      throw new Error('Server Error')
    }

    const json = await response.json()
    return json
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const fetchMoviesTrends = createAsyncThunk<
  IMovieResponse,
  IMoviesParams,
  { rejectValue: string }
>('movies/trends', async ({ filter, currentPage, search }, thunkAPI) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/movies?trends=1&page=${currentPage}${getQueryString(
        filter,
        search
      )}`
    )

    if (!response.ok) {
      throw new Error('Server Error')
    }

    const json = await response.json()
    return json
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

// Get favorite movies
export const fetchMoviesFavoriters = createAsyncThunk<
  IMovieResponse,
  IMoviesParams,
  { rejectValue: string }
>(
  'movies/favorites',
  async ({ filter, currentPage, search, favoriteItemsId }, thunkAPI) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/movies?&page=${currentPage}${getQueryString(
          filter,
          search,
          favoriteItemsId
        )}`
      )

      if (!response.ok) {
        throw new Error('Server Error')
      }

      const json = await response.json()
      return json
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<number>) => {
      state.favoriteItemsId = [...state.favoriteItemsId, action.payload]
      localStorage.setItem(
        'favoriteItems',
        JSON.stringify(state.favoriteItemsId)
      )
    },
    delFavorite: (state, action: PayloadAction<number>) => {
      state.favoriteItemsId = state.favoriteItemsId.filter(
        (id) => id !== action.payload
      )
      localStorage.setItem(
        'favoriteItems',
        JSON.stringify(state.favoriteItemsId)
      )
    },
    changeMovieItems: (state, action: PayloadAction<IMovieItem[]>) => {
      state.movieItems = action.payload
    },
  },
  extraReducers: (builder) => {
    // fulfilled
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      if (action.payload.page == 1) {
        state.movieItems = action.payload.rows
      } else {
        state.movieItems = [...state.movieItems, ...action.payload.rows]
      }
      state.totalPages = Math.ceil(action.payload.count / action.payload.limit)
      state.loading = false
    })

    builder.addCase(fetchMoviesFavoriters.fulfilled, (state, action) => {
      if (action.payload.page == 1) {
        state.movieItems = action.payload.rows
      } else {
        state.movieItems = [...state.movieItems, ...action.payload.rows]
      }

      state.totalPages = Math.ceil(action.payload.count / action.payload.limit)
      state.loading = false
    })
    builder.addCase(fetchMoviesTrends.fulfilled, (state, action) => {
      if (action.payload.page == 1) {
        state.movieItems = action.payload.rows
      } else {
        state.movieItems = [...state.movieItems, ...action.payload.rows]
      }

      state.totalPages = Math.ceil(action.payload.count / action.payload.limit)
      state.loading = false
    })
    // Error
    builder.addCase(fetchMovies.rejected, (state, action) => {
      alert(action.payload)
    })
    builder.addCase(fetchMoviesFavoriters.rejected, (state, action) => {
      alert(action.payload)
    })
    builder.addCase(fetchMoviesTrends.rejected, (state, action) => {
      alert(action.payload)
    })
    //Pending
    builder.addCase(fetchMovies.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(fetchMoviesFavoriters.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(fetchMoviesTrends.pending, (state, action) => {
      state.loading = true
    })
  },
})

export const { addFavorite, delFavorite, changeMovieItems } =
  moviesSlice.actions

export default moviesSlice.reducer
