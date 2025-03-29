import { format } from 'date-fns'
import { FiSunrise, FiSunset } from 'react-icons/fi'

export default function Forecast({ forecast }) {
  if (!forecast) return null

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        5-Day Forecast
      </h3>
      
      <div className="space-y-4">
        {forecast.map((day, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-4 bg-blue-50 dark:bg-gray-700 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors"
          >
            <div className="flex items-center gap-4">
              <p className="font-semibold w-24">
                {format(new Date(day.dt * 1000), 'EEE')}
              </p>
              <img 
                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt="Weather icon"
                className="w-12 h-12"
                width={48}
                height={48}
              />
              <p className="capitalize text-gray-600 dark:text-gray-300">
                {day.weather}
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                <FiSunrise />
                {format(new Date(day.sunrise * 1000), 'HH:mm')}
              </div>
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                <FiSunset />
                {format(new Date(day.sunset * 1000), 'HH:mm')}
              </div>
              <p className="text-xl font-semibold w-16 text-right">
                {Math.round(day.temp)}°C
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
