export default function useDebounce(
  func: (e: React.ChangeEvent<HTMLInputElement>) => void,
  milliseconds: number
) {
  const time = milliseconds || 400

  let timer: ReturnType<typeof setTimeout>

  return (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(func, time, e)
  }
}
