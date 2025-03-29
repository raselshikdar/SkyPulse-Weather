export default async function handler(req, res) {
  const { city, lat, lon } = req.query
  const API_KEY = process.env.OPENWEATHER_API_KEY

  if (!API_KEY) {
    return res.status(500).json({ error: 'Server configuration error' })
  }

  try {
    let coordinates = {}
    let queryCity = city

    // Geocoding API call for city search
    if (city) {
      const geoRes = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`
      )
      const geoData = await geoRes.json()
      
      if (!geoData.length) {
        return res.status(404).json({ error: 'City not found' })
      }
      
      coordinates.lat = geoData[0].lat
      coordinates.lon = geoData[0].lon
      queryCity = geoData[0].name
    } else if (lat && lon) {
      coordinates.lat = lat
      coordinates.lon = lon
    } else {
      return res.status(400).json({ error: 'Invalid request parameters' })
    }

    // Fetch weather data
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${API_KEY}`
    )
    const weatherData = await weatherRes.json()

    // Process current weather
    const current = {
      temp: weatherData.current.temp,
      feels_like: weatherData.current.feels_like,
      humidity: weatherData.current.humidity,
      wind_speed: weatherData.current.wind_speed,
      weather: weatherData.current.weather[0].description,
      icon: weatherData.current.weather[0].icon,
    }

    // Process forecast
    const forecast = weatherData.daily.slice(1, 6).map(day => ({
      dt: day.dt,
      temp: day.temp.day,
      weather: day.weather[0].description,
      icon: day.weather[0].icon,
      sunrise: day.sunrise,
      sunset: day.sunset,
    }))

    res.status(200).json({
      city: queryCity,
      current,
      forecast,
    })

  } catch (error) {
    console.error('API Error:', error)
    res.status(500).json({ error: 'Failed to retrieve weather data' })
  }
}
