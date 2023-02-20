import { useEffect, useState } from 'react'

export default function useBodyScrollLock(): [boolean, () => void] {
  const bodyScrollStyle = document.body.style

  const [isLock, setIsLock] = useState<boolean>(
    bodyScrollStyle.overflowY === 'hidden'
  )

  useEffect(() => {
    bodyScrollStyle.overflowY = isLock ? 'hidden' : 'auto'
  }, [isLock])

  const toggleScroll = (): void => setIsLock(!isLock)

  return [isLock, toggleScroll]
}
