declare interface WeatherData {
  temp: number
  feels_like: number
  humidity: number
  wind_speed: number
  weather: string
  icon: string
}

declare interface ForecastData {
  dt: number
  temp: number
  weather: string
  icon: string
  sunrise: number
  sunset: number
}
