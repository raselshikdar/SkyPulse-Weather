export default function WeatherCard({ weather, city }) {
  if (!weather) return null

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{city}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 capitalize">
            {weather.weather}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <img 
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt="Weather icon"
            className="w-24 h-24"
            width={96}
            height={96}
          />
          <p className="text-5xl font-bold text-primary dark:text-white">
            {Math.round(weather.temp)}°C
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-300">Feels Like</p>
          <p className="text-xl font-semibold">{Math.round(weather.feels_like)}°C</p>
        </div>
        <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-300">Humidity</p>
          <p className="text-xl font-semibold">{weather.humidity}%</p>
        </div>
        <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-300">Wind Speed</p>
          <p className="text-xl font-semibold">{weather.wind_speed} m/s</p>
        </div>
      </div>
    </div>
  )
}
