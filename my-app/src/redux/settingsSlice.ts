import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import { getErrors } from '../helpers/redux'

interface ISettingsEmailParams {
  new_email: string
  current_password: string
  accessToken: string
}
interface ISettingsPasswordParams {
  new_password: string
  current_password: string
  accessToken: string
}

interface ISettingsState {
  errMessage: string | undefined
  passwordMessage: string
  emailMessage: string
}

const initialState: ISettingsState = {
  errMessage: '',
  passwordMessage: '',
  emailMessage: '',
}

export const fetchSetEmail = createAsyncThunk<
  undefined,
  ISettingsEmailParams,
  { rejectValue: string }
>(
  'user/setEmail',
  async ({ new_email, current_password, accessToken }, thunkAPI) => {
    try {
      const response = await fetch(
        `https://studapi.teachmeskills.by/auth/users/set_email/`,
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ new_email, current_password }),
        }
      )
      if (!response.ok) {
        const error = await response.json()

        throw new Error(getErrors(error) ?? 'Server Error')
      }
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)
export const fetchSetPassword = createAsyncThunk<
  undefined,
  ISettingsPasswordParams,
  { rejectValue: string }
>(
  'user/setPassword',
  async ({ new_password, current_password, accessToken }, thunkAPI) => {
    try {
      const response = await fetch(
        `https://studapi.teachmeskills.by/auth/users/set_password/`,
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ new_password, current_password }),
        }
      )
      if (!response.ok) {
        const error = await response.json()

        throw new Error(getErrors(error) ?? 'Server Error')
      }
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changePasswordMessage: (state, action: PayloadAction<string>) => {
      state.passwordMessage = action.payload
    },
    changeEmailMessage: (state, action: PayloadAction<string>) => {
      state.emailMessage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSetEmail.fulfilled, (state, action) => {
      state.errMessage = ''
      state.emailMessage = 'Email has been updated'
    })
    builder.addCase(fetchSetEmail.rejected, (state, action) => {
      state.errMessage = action.payload
      state.emailMessage = ''
    })
    builder.addCase(fetchSetPassword.fulfilled, (state, action) => {
      state.errMessage = ''
      state.passwordMessage = 'Password has been updated'
    })
    builder.addCase(fetchSetPassword.rejected, (state, action) => {
      state.errMessage = action.payload
      state.passwordMessage = ''
    })
  },
})

export const { changePasswordMessage, changeEmailMessage } =
  settingsSlice.actions

export default settingsSlice.reducer
