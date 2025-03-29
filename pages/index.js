import { useState } from 'react'
import Layout from '../components/Layout'
import Header from '../components/Header'
import WeatherCard from '../components/WeatherCard'
import Forecast from '../components/Forecast'

export default function Home() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [error, setError] = useState(null)

  const fetchWeather = async (query) => {
    try {
      setError(null)
      const res = await fetch(`/api/weather?${query}`)
      if (!res.ok) throw new Error('Failed to fetch weather data.')
      const data = await res.json()
      setWeather(data.current)
      setForecast(data.forecast)
    } catch (err) {
      setError(err.message)
      setWeather(null)
      setForecast(null)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (city.trim() === '') return
    fetchWeather(`city=${encodeURIComponent(city)}`)
  }

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        fetchWeather(`lat=${latitude}&lon=${longitude}`)
      }, () => {
        setError('Geolocation permission denied.')
      })
    } else {
      setError('Geolocation is not supported.')
    }
  }

  return (
    <Layout>
      <Header onGeolocation={handleGeolocation} />
      <form onSubmit={handleSearch} className="flex justify-center mt-4">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 rounded-l-lg border border-gray-300"
        />
        <button type="submit" className="p-2 bg-blue-600 text-white rounded-r-lg">
          Search
        </button>
      </form>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {weather && <WeatherCard weather={weather} city={city} />}
      {forecast && <Forecast forecast={forecast} />}
    </Layout>
  )
}
