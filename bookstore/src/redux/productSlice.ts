import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import { IProductItem } from '../interface.app'

interface IProductState {
  totalCount: string | null
  productItems: IProductItem[]
  searchItems: IProductItem[]
  search: string
  favotiresId: number[]
  loading: boolean
}

const initialState: IProductState = {
  totalCount: null,
  productItems: [],
  searchItems: [],
  search: '',
  favotiresId: JSON.parse(localStorage.getItem('favorites') || '[]'),
  loading: false,
}

export const fetchFavoritesProducts = createAsyncThunk<
  IProductItem[],
  number[],
  { rejectValue: string }
>('favorites/productFavorites', async (favoritesId, thunkAPI) => {
  try {
    const response = await fetch(
      `http://localhost:3000/products?id=${favoritesId
        .map((id) => id)
        .join('&id=')}`
    )

    if (!response.ok) {
      throw new Error('Server Error')
    }

    const json = await response.json()
    return json
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const fetchSimilar = createAsyncThunk<
  IProductItem[],
  undefined,
  { rejectValue: string }
>('similar/similarProducts', async (_, thunkAPI) => {
  try {
    const response = await fetch(`http://localhost:3000/similar`)

    if (!response.ok) {
      throw new Error('Server Error')
    }

    const json = await response.json()
    return json
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const fetchProducts = createAsyncThunk<
  { count: string | null; rows: IProductItem[] },
  { currentPage: number; search?: string },
  { rejectValue: string }
>('products/productItems', async ({ currentPage, search }, thunkAPI) => {
  try {
    const response = await fetch(
      `http://localhost:3000/products?_page=${currentPage}&_limit=${6}${
        search ? `&title_like=${search}` : ''
      }`
    )

    if (!response.ok) {
      throw new Error('Server Error')
    }

    const res = {
      count: response.headers.get('x-total-count'),
      rows: (await response.json()) || [],
    }
    return res
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message)
  }
})
export const fetchProductsSearch = createAsyncThunk<
  IProductItem[],
  { currentPage: number; search: string },
  { rejectValue: string }
>(
  'productSearch/productSearchItems',
  async ({ currentPage, search }, thunkAPI) => {
    try {
      const response = await fetch(
        `http://localhost:3000/products?_page=${currentPage}&_limit=${6}&title_like=${search}`
      )

      if (!response.ok) {
        throw new Error('Server Error')
      }
      const res = await response.json()
      return res
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    changeSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    clearSearchItems: (state) => {
      state.searchItems = []
    },

    toggleFavorites: (state, action: PayloadAction<number>) => {
      if (state.favotiresId.includes(action.payload)) {
        localStorage.setItem(
          'favorites',
          JSON.stringify(
            state.favotiresId.filter((id) => id !== action.payload)
          )
        )
        state.favotiresId = state.favotiresId.filter(
          (id) => id !== action.payload
        )
      } else {
        localStorage.setItem(
          'favorites',
          JSON.stringify([...state.favotiresId, action.payload])
        )
        state.favotiresId = [...state.favotiresId, action.payload]
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.productItems = action.payload.rows
      state.totalCount = action.payload.count
      state.loading = false
    })
    builder.addCase(fetchProducts.rejected, (state, action) => {
      alert(action.payload)
    })
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(fetchFavoritesProducts.fulfilled, (state, action) => {
      state.productItems = action.payload
      state.loading = false
    })
    builder.addCase(fetchFavoritesProducts.rejected, (state, action) => {
      alert(action.payload)
    })
    builder.addCase(fetchFavoritesProducts.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(fetchSimilar.fulfilled, (state, action) => {
      state.productItems = action.payload
      state.loading = false
    })
    builder.addCase(fetchSimilar.rejected, (state, action) => {
      alert(action.payload)
    })
    builder.addCase(fetchSimilar.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(fetchProductsSearch.fulfilled, (state, action) => {
      state.searchItems = action.payload
      state.loading = false
    })
    builder.addCase(fetchProductsSearch.rejected, (state, action) => {
      alert(action.payload)
    })
    builder.addCase(fetchProductsSearch.pending, (state, action) => {
      state.loading = true
    })
  },
})

export const { toggleFavorites, clearSearchItems, changeSearch } =
  productsSlice.actions

export default productsSlice.reducer
