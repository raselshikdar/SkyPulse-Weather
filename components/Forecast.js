import { format } from 'date-fns'
import { FiSunrise, FiSunset } from 'react-icons/fi'

export default function Forecast({ forecast }) {
  if (!forecast || forecast.length === 0) return null

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg mb-8 animate-fade-in dark:bg-gray-800">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 dark:text-white">
        5-Day Forecast
      </h3>
      
      <div className="space-y-4">
        {forecast.map((day, index) => (
          <div 
            key={index}
            className="flex flex-col md:flex-row items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            <div className="flex items-center gap-4 w-full md:w-1/2 mb-2 md:mb-0">
              <p className="font-semibold text-gray-700 dark:text-gray-300 w-20">
                {format(new Date(day.dt * 1000), 'EEE')}
              </p>
              <img 
                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt="Weather icon"
                className="w-12 h-12"
                width={48}
                height={48}
                onError={(e) => {
                  e.target.src = '/weather-icon-fallback.png'
                }}
              />
              <p className="capitalize text-gray-600 dark:text-gray-300 text-sm md:text-base">
                {day.weather}
              </p>
            </div>
            
            <div className="flex items-center justify-between w-full md:w-1/2">
              <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                <FiSunrise className="text-lg" />
                <span className="text-sm md:text-base">
                  {format(new Date(day.sunrise * 1000), 'HH:mm')}
                </span>
              </div>
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                <FiSunset className="text-lg" />
                <span className="text-sm md:text-base">
                  {format(new Date(day.sunset * 1000), 'HH:mm')}
                </span>
              </div>
              <p className="text-xl font-semibold text-primary dark:text-white">
                {Math.round(day.temp)}°C
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
