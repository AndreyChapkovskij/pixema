import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { ISearchItem } from '../interface.app'

interface ISearchState {
  searchItems: ISearchItem[]
}

const initialState: ISearchState = {
  searchItems: [],
}

export const fetchSearch = createAsyncThunk<
  ISearchItem[],
  { search: string },
  { rejectValue: string }
>('search/searchItems', async ({ search }, thunkAPI) => {
  try {
    const response = await fetch(process.env.HOST + `?search=${search}`)

    if (!response.ok) {
      throw new Error('Server Error')
    }

    const json = await response.json()
    return json.rows
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSearch.fulfilled, (state, action) => {
      state.searchItems = action.payload
    })

    builder.addCase(fetchSearch.rejected, (state, action) => {
      alert(action.payload)
    })
  },
})

export default searchSlice.reducer
