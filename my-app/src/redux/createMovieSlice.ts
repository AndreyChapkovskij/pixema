import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getErrors } from '../helpers/redux'

interface IMovieCreateState {
  successMessage: string
}

const initialState: IMovieCreateState = {
  successMessage: '',
}

export const fetchMovieCreate = createAsyncThunk<
  undefined,
  FormData,
  { rejectValue: string }
>('createMovie/createMovieItems', async (movie, thunkAPI) => {
  try {
    const response = await fetch(`http://localhost:5000/api/movies`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: movie,
    })

    if (!response.ok) {
      const error = await response.json()

      throw new Error(getErrors(error) ?? 'Server Error')
    }
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

const createMovieSlice = createSlice({
  name: 'createMovie',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovieCreate.fulfilled, (state, action) => {
      state.successMessage = 'Your card have been created'
    })

    builder.addCase(fetchMovieCreate.rejected, (state, action) => {
      alert(action.payload)
    })
  },
})

export default createMovieSlice.reducer
