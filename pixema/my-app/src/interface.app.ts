export interface IMovieItem {
  id: number
  title: string
  rating: string
  img: string
  imdb: string
  duration: number
  description: string
  year: number
  trends: number
  genres: IGenres[]
  country: ICountry[]
}
export interface IMovieInfo {
  [key: string]: string
}
export interface IMovieDetails extends IMovieItem {
  info: IMovieInfo
}
export interface ICountry {
  id: number
  name: string
}
export interface IGenres {
  id: number
  name: string
}
export interface IFilter {
  genres: IGenres[]
  sortBy: string
  shortSearch: string
  groupByYear: [string, string]
  groupByRating: [string, string]
  country: string
}
export interface ISearchMovie {
  id: number
  title: string
  rating: string
  img: string
  imdb: string
  duration: number
  description: string
  year: number
  trends: number
  genres: IGenres[]
}
export interface IRegistration {
  username: string
  email: string
  password: string
}
export interface IUserReset {
  uid: string
  token: string
  new_password: string
}
export interface IUserTokens {
  access: string
  refresh: string
}
export interface IUserData {
  username?: string
  id?: number
  email?: string
}
export interface IToken {
  uid: string
  token: string
}
