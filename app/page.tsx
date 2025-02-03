"use client"

import { useState, useEffect } from "react"

const VIBRANT_COLORS = [
  "bg-yellow-400",
  "bg-pink-500",
  "bg-blue-500",
  "bg-green-400",
  "bg-purple-500",
  "bg-red-500",
  "bg-orange-500",
  "bg-teal-400",
]

export default function Home() {
  const [dayOfYear, setDayOfYear] = useState<string>("")
  const [dayOfWeek, setDayOfWeek] = useState<string>("")
  const [bgColorIndex, setBgColorIndex] = useState(0)

  useEffect(() => {
    const calculateDayInfo = () => {
      const now = new Date()
      const start = new Date(now.getFullYear(), 0, 0)
      const diff = now.getTime() - start.getTime() + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000
      const oneDay = 1000 * 60 * 60 * 24
      const day = Math.floor(diff / oneDay)

      const isLeapYear = (year: number) => {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
      }

      const totalDays = isLeapYear(now.getFullYear()) ? 366 : 365

      setDayOfYear(`${day} of ${totalDays}`)

      const daysOfWeek = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]
      setDayOfWeek(daysOfWeek[now.getDay()])
    }

    calculateDayInfo()
    // Update every minute
    const timer = setInterval(calculateDayInfo, 60000)

    return () => clearInterval(timer)
  }, [])

  const changeBackgroundColor = () => {
    setBgColorIndex((prevIndex) => (prevIndex + 1) % VIBRANT_COLORS.length)
  }

  return (
    <main
      className={`min-h-screen ${VIBRANT_COLORS[bgColorIndex]} flex items-center justify-center p-4 transition-colors duration-300`}
      onClick={changeBackgroundColor}
    >
      <div className="bg-white border-8 border-black p-4 sm:p-6 md:p-8 transform -rotate-2 shadow-[8px_8px_0_0_rgba(0,0,0,1)] w-full max-w-md sm:max-w-lg md:max-w-xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-mono font-bold text-center mb-2 sm:mb-4 uppercase">
          {dayOfWeek}
        </h2>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-mono font-bold text-center break-words">
          {dayOfYear}
        </h1>
      </div>
    </main>
  )
}

