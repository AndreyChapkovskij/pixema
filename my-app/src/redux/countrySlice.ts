import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export interface ICountry {
  id: number
  name: string
}
interface ICountryState {
  countryItems: ICountry[]
}

const initialState: ICountryState = {
  countryItems: [],
}

export const fetchCountry = createAsyncThunk<
  ICountry[],
  undefined,
  { rejectValue: string }
>('countries/countryItems', async (_, thunkAPI) => {
  try {
    const response = await fetch(`http://localhost:5000/api/country`)

    if (!response.ok) {
      throw new Error('Server Error')
    }

    const json = await response.json()
    return json.rows
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCountry.fulfilled, (state, action) => {
      state.countryItems = action.payload
    })

    builder.addCase(fetchCountry.rejected, (state, action) => {
      alert(action.payload)
    })
  },
})


export default countrySlice.reducer
