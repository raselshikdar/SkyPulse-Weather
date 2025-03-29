import { useState, useEffect } from 'react'

export default function UnitToggle() {
  const [isCelsius, setIsCelsius] = useState(true)

  useEffect(() => {
    // Implement unit conversion logic here
    // You'll need to lift state up to parent component
  }, [isCelsius])

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setIsCelsius(true)}
        className={`px-3 py-1 rounded-lg ${isCelsius ? 'bg-primary text-white' : 'bg-gray-100'}`}
      >
        °C
      </button>
      <button
        onClick={() => setIsCelsius(false)}
        className={`px-3 py-1 rounded-lg ${!isCelsius ? 'bg-primary text-white' : 'bg-gray-100'}`}
      >
        °F
      </button>
    </div>
  )
}
