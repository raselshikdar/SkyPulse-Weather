export default async function handler(req, res) {
  const { city, lat, lon } = req.query
  const API_KEY = process.env.OPENWEATHER_API_KEY

  console.log('API Request Query:', req.query)
  console.log('API Key Present:', !!API_KEY)

  if (!API_KEY) {
    console.error('API Key Missing')
    return res.status(500).json({ 
      error: 'Server configuration error - Missing OpenWeather API Key' 
    })
  }

  try {
    let coordinates = {}
    let queryCity = city

    if (city) {
      console.log('City Search:', city)
      const geoRes = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`
      )
      
      if (!geoRes.ok) {
        console.error('Geocoding API Error:', geoRes.status)
        return res.status(geoRes.status).json({ 
          error: `Geocoding API Error: ${geoRes.statusText}` 
        })
      }

      const geoData = await geoRes.json()
      console.log('Geocoding Response:', geoData)

      if (!geoData || geoData.length === 0) {
        return res.status(404).json({ error: 'City not found' })
      }

      coordinates.lat = geoData[0].lat
      coordinates.lon = geoData[0].lon
      queryCity = geoData[0].name
    } else if (lat && lon) {
      console.log('Coordinate Search:', lat, lon)
      coordinates.lat = lat
      coordinates.lon = lon
    } else {
      return res.status(400).json({ error: 'Invalid request parameters' })
    }

    console.log('Fetching weather for:', coordinates)
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${API_KEY}`
    )

    if (!weatherRes.ok) {
      console.error('Weather API Error:', weatherRes.status)
      return res.status(weatherRes.status).json({ 
        error: `Weather API Error: ${weatherRes.statusText}` 
      })
    }

    const weatherData = await weatherRes.json()
    console.log('Weather API Response:', weatherData)

    if (!weatherData.current || !weatherData.daily) {
      return res.status(500).json({ error: 'Invalid data from weather API' })
    }

    const current = {
      temp: weatherData.current.temp,
      feels_like: weatherData.current.feels_like,
      humidity: weatherData.current.humidity,
      wind_speed: weatherData.current.wind_speed,
      weather: weatherData.current.weather[0]?.description || 'N/A',
      icon: weatherData.current.weather[0]?.icon || '01d',
    }

    const forecast = weatherData.daily.slice(1, 6).map(day => ({
      dt: day.dt,
      temp: day.temp?.day || 0,
      weather: day.weather[0]?.description || 'N/A',
      icon: day.weather[0]?.icon || '01d',
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
    res.status(500).json({ 
      error: 'Internal server error - ' + error.message 
    })
  }
}
