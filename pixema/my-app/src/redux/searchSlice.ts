import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import { ISearchMovie } from '../interface.app'

interface ISearchState {
  searchItems: ISearchMovie[]
  search: string
}

const initialState: ISearchState = {
  searchItems: [],
  search: '',
}

export const fetchSearch = createAsyncThunk<
  ISearchMovie[],
  string,
  { rejectValue: string }
>('search/searchItems', async (search, thunkAPI) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/search?search=${search.trim()}`
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

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearSearchItems: (state) => {
      state.searchItems = []
    },
    changeSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearch.fulfilled, (state, action) => {
      state.searchItems = action.payload
    })

    builder.addCase(fetchSearch.rejected, (state, action) => {
      alert(action.payload)
    })
  },
})

export const { clearSearchItems, changeSearch } = searchSlice.actions

export default searchSlice.reducer
