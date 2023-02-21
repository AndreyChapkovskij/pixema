import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IProductItem } from '../interface.app'

interface ICartProductsState {
  cartItems: ICartProduct[]
}
export interface ICartProduct {
  id: number
  title: string
  count: number
  image: string
  authors: string[]
  publisher: string
  cost: string
}

const initialState: ICartProductsState = {
  cartItems: JSON.parse(localStorage.getItem('cart') || '[]'),
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    changeCartItems: (state, action: PayloadAction<ICartProduct[]>) => {
      state.cartItems = action.payload
    },
    addCartItems: (
      state,
      action: PayloadAction<IProductItem | ICartProduct>
    ) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      )
      if (cartItem) {
        const cart = state.cartItems.map((cartItem) =>
          cartItem.id === action.payload.id
            ? { ...cartItem, count: ++cartItem.count }
            : cartItem
        )
        localStorage.setItem('cart', JSON.stringify(cart))
        state.cartItems = cart
      } else {
        const { id, image, publisher, authors, cost, title } = action.payload
        localStorage.setItem(
          'cart',
          JSON.stringify([
            ...state.cartItems,
            { id, image, count: 1, authors, publisher, title, cost },
          ])
        )
        state.cartItems = [
          ...state.cartItems,
          { id, image, count: 1, authors, publisher, title, cost },
        ]
      }
    },
    delCartCountOne: (state, action: PayloadAction<number>) => {
      const cart = state.cartItems.filter((cartItem) => {
        if (cartItem.id === action.payload) {
          if (cartItem.count > 1) {
            return { id: cartItem.id, count: --cartItem.count }
          }
        } else {
          return cartItem
        }
      })
      localStorage.setItem('cart', JSON.stringify(cart))
      state.cartItems = cart
    },
    delCartItem: (state, action: PayloadAction<number>) => {
      const cart = state.cartItems.filter((item) => item.id !== action.payload)
      localStorage.setItem('cart', JSON.stringify(cart))
      state.cartItems = cart
    },
  },
})

export const { changeCartItems, addCartItems, delCartItem, delCartCountOne } =
  cartSlice.actions

export default cartSlice.reducer
