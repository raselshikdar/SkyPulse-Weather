export default function WeatherCard({ weather, city }) {
  return (
    <div className="max-w-md mx-auto my-4 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-2">{city}</h2>
      <div className="flex items-center">
        <img
          src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt="Weather Icon"
          className="w-20"
        />
        <div className="ml-4">
          <p className="text-4xl font-bold">{weather.temp}°C</p>
          <p className="capitalize">{weather.weather[0]?.description}</p> {/* Fixed */}
        </div>
      </div>
    </div>
  )
}
