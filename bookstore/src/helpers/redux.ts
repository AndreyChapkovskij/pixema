export const getErrors = (error: any): string => {
  const errors = Object.values(error)
    ?.map((err) => (Array.isArray(err) ? err[0] : err))
    .join(' ')

  return errors
}
