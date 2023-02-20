import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { IProductItem } from '../interface.app'

interface IProductDetailsState {
  productItem: IProductItem | null
  productsSimilar: IProductItem[]
}

const initialState: IProductDetailsState = {
  productItem: null,
  productsSimilar: [],
}

export const fetchProductById = createAsyncThunk<
  IProductItem,
  string,
  { rejectValue: string }
>('movies/movieId', async (productId, thunkAPI) => {
  try {
    const response = await fetch(`http://localhost:3000/products/${productId}`)

    if (!response.ok) {
      throw new Error('Server Error')
    }

    const json = await response.json()
    return json
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const fetchProductsSimilar = createAsyncThunk<
  IProductItem[],
  undefined,
  { rejectValue: string }
>('movies/recommend', async (_, thunkAPI) => {
  try {
    const response = await fetch(process.env.HOST + `/similar`)

    if (!response.ok) {
      throw new Error('Server Error')
    }

    const json = await response.json()
    return json.rows
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

const ProductDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.productItem = action.payload
    })
    builder.addCase(fetchProductById.rejected, (state, action) => {
      alert(action.payload)
    })
    builder.addCase(fetchProductsSimilar.fulfilled, (state, action) => {
      state.productsSimilar = action.payload
    })
    builder.addCase(fetchProductsSimilar.rejected, (state, action) => {
      alert(action.payload)
    })
  },
})

export default ProductDetailsSlice.reducer
