import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import { getErrors } from '../helpers/redux'

export interface IRegistration {
  username: string
  email: string
  password: string
}
export interface IToken {
  uid: string
  token: string
}

interface IRegistrationState {
  errMessage: string | undefined
  isToken: boolean
  isSuccess: boolean
}

const initialState: IRegistrationState = {
  errMessage: '',
  isToken: false,
  isSuccess: false,
}

// Registration
export const fetchRegister = createAsyncThunk<
  undefined,
  IRegistration,
  { rejectValue: string }
>('user/register', async (user, thunkAPI) => {
  try {
    const response = await fetch(
      `https://studapi.teachmeskills.by/auth/users/`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }
    )

    if (!response.ok) {
      const error = await response.json()

      throw new Error(getErrors(error) ?? 'Server Error')
    }
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

// Activate
export const fetchActivate = createAsyncThunk<
  undefined,
  IToken,
  { rejectValue: string }
>('user/activate', async (token, thunkAPI) => {
  try {
    const response = await fetch(
      `https://studapi.teachmeskills.by/auth/users/activation/`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(token),
      }
    )
    if (!response.ok) {
      const error = await response.json()

      throw new Error(getErrors(error) ?? 'Server Error')
    }
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    changeIsSuccess: (state, action: PayloadAction<boolean>) => {
      state.isSuccess = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.isToken = true
      state.errMessage = ''
    })
    builder.addCase(fetchRegister.rejected, (state, action) => {
      state.isToken = false
      state.errMessage = action.payload
    })
    builder.addCase(fetchActivate.fulfilled, (state, action) => {
      state.isToken = false
      state.isSuccess = true
      state.errMessage = ''
    })
    builder.addCase(fetchActivate.rejected, (state, action) => {
      state.errMessage = action.payload
    })
  },
})

export const { changeIsSuccess } = registrationSlice.actions

export default registrationSlice.reducer
