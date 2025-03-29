import { format } from 'date-fns'

export default function Forecast({ forecast }) {
  return (
    <div className="max-w-md mx-auto my-4 p-6 bg-white rounded-lg shadow">
      <h3 className="text-xl font-bold mb-4">5-Day Forecast</h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {forecast.map((day, index) => (
          <div key={index} className="flex flex-col items-center">
            <p className="font-semibold">{format(new Date(day.dt * 1000), 'EEE')}</p>
            <img
              src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt="Icon"
              className="w-12"
            />
            <p>{Math.round(day.temp)}°C</p>
            <p className="capitalize text-sm">{day.weather[0]?.description}</p> {/* Fixed */}
          </div>
        ))}
      </div>
    </div>
  )
}
