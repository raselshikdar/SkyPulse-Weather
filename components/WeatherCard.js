export default function WeatherCard({ weather, city }) {
  if (!weather) return null

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg mb-8 animate-fade-in
      transition-all duration-300 hover:shadow-xl dark:bg-gray-800">
      
      <div className="flex flex-col md:flex-row justify-between items-center">
        {/* Location Section */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {city || 'Unknown Location'}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 capitalize">
            {weather.weather || 'No weather data available'}
          </p>
        </div>

        {/* Temperature Section */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <img 
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt="Weather icon"
              className="w-24 h-24"
              width={96}
              height={96}
              onError={(e) => {
                e.target.src = '/weather-icon-fallback.png'
              }}
            />
          </div>
          <p className="text-5xl font-bold text-primary dark:text-white">
            {Math.round(weather.temp)}°C
          </p>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="weather-detail-card">
          <span className="detail-label">Feels Like</span>
          <span className="detail-value">
            {Math.round(weather.feels_like)}°C
          </span>
        </div>
        
        <div className="weather-detail-card">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">
            {weather.humidity}%
          </span>
        </div>
        
        <div className="weather-detail-card">
          <span className="detail-label">Wind Speed</span>
          <span className="detail-value">
            {weather.wind_speed} m/s
          </span>
        </div>
        
        <div className="weather-detail-card">
          <span className="detail-label">Pressure</span>
          <span className="detail-value">
            {weather.pressure || 'N/A'} hPa
          </span>
        </div>
      </div>
    </div>
  )
}
