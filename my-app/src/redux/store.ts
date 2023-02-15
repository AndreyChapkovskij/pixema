import { configureStore, combineReducers } from '@reduxjs/toolkit'

import moviesReducer from './moviesSlice'
import themeReducer from './themeSlice'
import userReducer from './userSlice'
import genresReducer from './genresSlice'
import countryReducer from './countrySlice'
import filterReducer from './filterSlice'
import registrationReducer from './registrationSlice'
import resetReducer from './resetSlice'
import movieDetailsReducer from './movieDetailsSlice'
import settingsReducer from './settingsSlice'
import createMovieReducer from './createMovieSlice'

const rootReducer = combineReducers({
  moviesReducer,
  themeReducer,
  userReducer,
  genresReducer,
  countryReducer,
  settingsReducer,
  resetReducer,
  registrationReducer,
  filterReducer,
  movieDetailsReducer,
  createMovieReducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export default store

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
