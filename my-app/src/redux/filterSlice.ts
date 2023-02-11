import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IGenres } from './genresSlice'

export interface IFilter {
  genres: IGenres[]
  sortBy: string
  shortSearch: string
  groupByYear: [string, string]
  groupByRating: [string, string]
  country: string
}

interface IFilterState {
  isFilter: boolean
  isFilterWasChanged: boolean
  filter: IFilter
}

const initialState: IFilterState = {
  isFilter: false,
  isFilterWasChanged: false,
  filter: {
    genres: [],
    sortBy: '',
    shortSearch: '',
    groupByYear: ['', ''],
    groupByRating: ['', ''],
    country: '',
  },
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setIsFilter: (state, action: PayloadAction<boolean>) => {
      state.isFilter = action.payload
    },
    setIsFilterWasChanged: (state, action: PayloadAction<boolean>) => {
      state.isFilterWasChanged = action.payload
    },
    changeGenres: (state, action: PayloadAction<IGenres[]>) => {
      state.filter.genres = action.payload
    },
    changeSortBy: (state, action: PayloadAction<string>) => {
      state.filter.sortBy = action.payload
    },
    changeShortSearch: (state, action: PayloadAction<string>) => {
      state.filter.shortSearch = action.payload
    },
    changeGroupByYear: (state, action: PayloadAction<[string, string]>) => {
      state.filter.groupByYear = action.payload
    },
    changeGroupByRating: (state, action: PayloadAction<[string, string]>) => {
      state.filter.groupByRating = action.payload
    },
    changeCountry: (state, action: PayloadAction<string>) => {
      state.filter.country = action.payload
    },
    clearFilter: (state) => {
      state.filter = {
        genres: [],
        sortBy: '',
        shortSearch: '',
        groupByYear: ['', ''],
        groupByRating: ['', ''],
        country: '',
      }
    },
  },
})

export const {
  setIsFilter,
  setIsFilterWasChanged,
  changeGenres,
  changeSortBy,
  changeShortSearch,
  changeGroupByYear,
  changeGroupByRating,
  changeCountry,
  clearFilter,
} = filterSlice.actions

export default filterSlice.reducer
