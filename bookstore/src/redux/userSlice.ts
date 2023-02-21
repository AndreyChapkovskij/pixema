import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import { getErrors } from '../helpers/redux'

interface IUserTokens {
  access: string
  refresh: string
}
interface IUserData {
  username?: string
  id?: number
  email?: string
}

interface IUserState {
  userData: IUserData
  accessToken: string
  isLoggedIn: boolean
  successMessage: string
}

const initialState: IUserState = {
  userData: {},
  accessToken: '',
  isLoggedIn: false,
  successMessage: '',
}

export interface IUserParams {
  email: string
  password: string
}

// Login
export const fetchLogin = createAsyncThunk<
  IUserTokens,
  IUserParams,
  { rejectValue: string }
>('user/login', async (user, thunkAPI) => {
  try {
    const response = await fetch(
      `https://studapi.teachmeskills.by/auth/jwt/create/`,
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

    const json = await response.json()
    return json
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const fetchUserData = createAsyncThunk<
  IUserData,
  string,
  { rejectValue: string }
>('user/isLogin', async (accessToken, thunkAPI) => {
  try {
    const response = await fetch(
      `https://studapi.teachmeskills.by/auth/users/me/`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    if (!response.ok) {
      const error = await response.json()

      throw new Error(getErrors(error) ?? 'Server Error')
    }

    const json = await response.json()
    return json
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

// Refresh
export const fetchRefresh = createAsyncThunk<
  { access: string },
  { refresh: string },
  { rejectValue: string }
>('user/refresh', async (refreshToken, thunkAPI) => {
  try {
    const response = await fetch(
      `https://studapi.teachmeskills.by/auth/jwt/refresh/
        `,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(refreshToken),
      }
    )

    if (!response.ok) {
      const error = await response.json()

      throw new Error(getErrors(error) ?? 'Server Error')
    }

    const json = await response.json()
    return json
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.userData = {}
      state.accessToken = ''
      localStorage.removeItem('user')
      state.isLoggedIn = false
    },
    changeSuccessMessage: (state, action: PayloadAction<string>) => {
      state.successMessage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      localStorage.setItem('user', JSON.stringify(action.payload))
      state.isLoggedIn = true
      state.accessToken = action.payload.access
    })
    builder.addCase(fetchRefresh.fulfilled, (state, action) => {
      state.accessToken = action.payload.access
      const user = JSON.parse(localStorage.getItem('user') || '')
      user.access = state.accessToken
      localStorage.setItem('user', JSON.stringify(user))
      state.isLoggedIn = true
    })
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.userData = action.payload
    })
    builder.addCase(fetchLogin.rejected, (state, action) => {
      alert(action.payload)
      state.isLoggedIn = false
    })
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.userData = {}
      state.isLoggedIn = false
    })
    builder.addCase(fetchRefresh.rejected, (state, action) => {
      state.accessToken = ''
      state.isLoggedIn = false
    })
  },
})

export const { logout, changeSuccessMessage } = userSlice.actions

export default userSlice.reducer
