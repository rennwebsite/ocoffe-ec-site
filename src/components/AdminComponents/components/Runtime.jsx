import { useState, useEffect } from 'react'

const Runtime = () => {
  const [startTime] = useState(new Date()) // Tetapkan waktu awal sekali saat komponen dimount
  const [runtime, setRuntime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date()
      const timeDiff = currentTime - startTime
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((timeDiff / (1000 * 60)) % 60)
      const seconds = Math.floor((timeDiff / 1000) % 60)

      setRuntime({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(interval)
  }, [startTime])

  return (
    <>
      {runtime.days}d, {runtime.hours}h, {runtime.minutes}m
    </>
  )
}

export default Runtime
