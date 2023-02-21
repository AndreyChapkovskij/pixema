import { configureStore, combineReducers } from '@reduxjs/toolkit'

import productsReducer from './productSlice'
import searchReducer from './searchSlice'
import accountReducer from './accountSlice'
import productDetailsReducer from './productDetailsSlice'
import userReducer from './userSlice'
import registrationReducer from './registrationSlice'
import resetReducer from './resetSlice'
import cartReducer from './cartSlice'

const rootReducer = combineReducers({
  userReducer,
  resetReducer,
  registrationReducer,
  productDetailsReducer,
  accountReducer,
  searchReducer,
  productsReducer,
  cartReducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export default store

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
