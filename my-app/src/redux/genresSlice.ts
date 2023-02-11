import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export interface IGenres {
  id: number
  name: string
}
interface IGenresParams {
  genreValue: string
  genreAdded?: IGenres[]
}

interface IGenresState {
  genreItems: IGenres[]
}

const initialState: IGenresState = {
  genreItems: [],
}

export const fetchGenres = createAsyncThunk<
  IGenres[],
  IGenresParams,
  { rejectValue: string }
>('genres/genreItems', async ({ genreValue, genreAdded }, thunkAPI) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/genres?search=${genreValue}&without=${
        genreAdded && genreAdded.map((item) => item.id).join(',')
      }`
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

const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {
    clearGenres: (state) => {
      state.genreItems = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGenres.fulfilled, (state, action) => {
      state.genreItems = action.payload
    })

    builder.addCase(fetchGenres.rejected, (state, action) => {
      alert(action.payload)
    })
  },
})

export const { clearGenres } = genresSlice.actions

export default genresSlice.reducer
