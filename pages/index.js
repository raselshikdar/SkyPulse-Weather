import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Header from '../components/Header'
import WeatherCard from '../components/WeatherCard'
import Forecast from '../components/Forecast'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { FiSearch } from 'react-icons/fi'

export default function Home() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  // Debugging
  console.log('Current Weather State:', weather)
  console.log('Forecast Data:', forecast)

  const fetchWeather = async (query) => {
    try {
      setLoading(true)
      setError(null)
      const startTime = Date.now()
      
      const res = await fetch(`/api/weather?${query}`)
      const responseTime = Date.now() - startTime
      
      console.log(`API Response Time: ${responseTime}ms`)
      console.log('API Response Status:', res.status)

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || `HTTP Error: ${res.status}`)
      }

      const data = await res.json()
      console.log('API Response Data:', data)

      if (!data.current || !data.forecast) {
        throw new Error('Invalid data structure from API')
      }

      setWeather(data.current)
      setForecast(data.forecast)
      setCity(data.city)
    } catch (err) {
      console.error('Fetch Error:', err)
      setError(err.message)
      setWeather(null)
      setForecast(null)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (city.trim()) {
      console.log('Searching for:', city)
      fetchWeather(`city=${encodeURIComponent(city)}`)
    }
  }

  const handleGeolocation = () => {
    console.log('Attempting geolocation...')
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Geolocation success:', position.coords)
          const { latitude, longitude } = position.coords
          fetchWeather(`lat=${latitude}&lon=${longitude}`)
        },
        (error) => {
          console.error('Geolocation error:', error)
          setError('Please enable location permissions in your browser settings')
        }
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
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-0"
            aria-label="Enter city name"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary disabled:opacity-50 transition-all flex items-center gap-2"
          >
            <FiSearch className="text-lg" />
            <span className="sr-only">Search</span>
          </button>
        </div>
      </form>

      {loading && <LoadingSpinner />}

      {error && <ErrorMessage message={error} />}

      {weather && <WeatherCard weather={weather} city={city} />}
      {forecast && <Forecast forecast={forecast} />}

      {/* Debug Information */}
      {process.env.NODE_ENV !== 'production' && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Debug Information</h3>
          <pre>Weather State: {JSON.stringify(weather, null, 2)}</pre>
          <pre className="mt-2">Forecast State: {JSON.stringify(forecast, null, 2)}</pre>
        </div>
      )}
    </Layout>
  )
}
