import { createSlice } from '@reduxjs/toolkit'

interface IThemeState {
  isTheme: boolean
}

const initialState: IThemeState = {
  isTheme: false,
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeIsTheme: (state) => {
      state.isTheme = !state.isTheme
      localStorage.setItem('isTheme', JSON.stringify(state.isTheme))
    },
  },
})

export const { changeIsTheme } = themeSlice.actions

export default themeSlice.reducer
