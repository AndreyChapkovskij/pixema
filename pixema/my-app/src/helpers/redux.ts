import { IFilter } from '../interface.app'

export const getQueryString = (
  filter: IFilter,
  search?: string,
  favoriteItemsId?: number[]
): string => {
  let queryString: string[] = []

  filter.shortSearch && queryString.push(`shortSearch=${filter.shortSearch}`)
  filter.sortBy && queryString.push(`sortBy=${filter.sortBy}`)
  filter.country && queryString.push(`country=${filter.country}`)

  filter.genres?.length &&
    queryString.push(`genres=${filter.genres.map((item) => item.id).join(',')}`)

  filter.groupByYear[0] &&
    queryString.push(`groupByYear=${filter.groupByYear.join(',')}`)
  filter.groupByRating[0] &&
    queryString.push(`groupByRating=${filter.groupByRating.join(',')}`)

  search && queryString.push(`search=${search.trim()}`)
  favoriteItemsId?.length &&
    queryString.push(`favoritersId=${favoriteItemsId.join(',')}`)

  return queryString[0] ? '&' + queryString.join('&') : ''
}

export const getErrors = (error: any): string => {
  const errors = Object.values(error)
    ?.map((err) => (Array.isArray(err) ? err[0] : err))
    .join(' ')

  return errors
}
