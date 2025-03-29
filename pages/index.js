import { useState } from 'react'
import Layout from '../components/Layout'
import Header from '../components/Header'
import WeatherCard from '../components/WeatherCard'
import Forecast from '../components/Forecast'
import { FiSearch } from 'react-icons/fi'

export default function Home() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchWeather = async (query) => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch(`/api/weather?${query}`)
      
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Failed to fetch weather data')
      }

      const data = await res.json()
      setWeather(data.current)
      setForecast(data.forecast)
      setCity(data.city)
    } catch (err) {
      setError(err.message)
      setWeather(null)
      setForecast(null)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (city.trim()) fetchWeather(`city=${encodeURIComponent(city)}`)
  }

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          fetchWeather(`lat=${latitude}&lon=${longitude}`)
        },
        () => setError('Please enable location permissions to continue')
      )
    } else {
      setError('Geolocation is not supported by your browser')
    }
  }

  return (
    <Layout>
      <Header onGeolocation={handleGeolocation} />
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary disabled:opacity-50 transition-all flex items-center gap-2"
          >
            <FiSearch />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      </form>

      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg max-w-md mx-auto text-center">
          {error}
        </div>
      )}

      {weather && <WeatherCard weather={weather} city={city} />}
      {forecast && <Forecast forecast={forecast} />}
    </Layout>
  )
}
