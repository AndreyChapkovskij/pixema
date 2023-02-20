interface IProductInfo {
  [key: string]: string
}
interface IProductReview {
  id: number
  name: string
  text: string
  mark: number
}
export interface IProductItem {
  id: number
  title: string
  cost: string
  rating: number
  image: string
  publisher: string
  description: string
  authors: string[]
  info: IProductInfo[]
  reviews: IProductReview[]
}

export interface ISearchItem {
  id: number
  title: string
  image: string
}
