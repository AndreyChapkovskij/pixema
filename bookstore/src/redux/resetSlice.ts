import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import { getErrors } from '../helpers/redux'

interface IUser {
  uid: string
  token: string
  new_password: string
}

interface IResetState {
  errMessage: string | undefined
  resetMessage: string
  isSuccess: boolean
}

const initialState: IResetState = {
  errMessage: '',
  resetMessage: '',
  isSuccess: false,
}

// Reset password
export const fetchResetPassword = createAsyncThunk<
  undefined,
  { email: string },
  { rejectValue: string }
>('user/reset', async ({ email }, thunkAPI) => {
  try {
    const response = await fetch(
      `https://studapi.teachmeskills.by/auth/users/reset_password/`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
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
// Reset confirm
export const fetchResetConfirm = createAsyncThunk<
  undefined,
  IUser,
  { rejectValue: string }
>('user/confirm', async (user, thunkAPI) => {
  try {
    const response = await fetch(
      `https://studapi.teachmeskills.by/auth/users/reset_password_confirm/`,
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

const resetSlice = createSlice({
  name: 'reset',
  initialState,
  reducers: {
    changeIsSuccess: (state, action: PayloadAction<boolean>) => {
      state.isSuccess = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchResetPassword.fulfilled, (state, action) => {
      state.resetMessage = 'Your link has been sent'
      state.errMessage = ''
    })
    builder.addCase(fetchResetPassword.rejected, (state, action) => {
      state.errMessage = action.payload
    })
    builder.addCase(fetchResetConfirm.fulfilled, (state, action) => {
      state.errMessage = ''
      state.resetMessage = ''
      state.isSuccess = true
    })
    builder.addCase(fetchResetConfirm.rejected, (state, action) => {
      state.errMessage = action.payload
    })
  },
})

export const { changeIsSuccess } = resetSlice.actions

export default resetSlice.reducer
