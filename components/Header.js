export default function Header({ onGeolocation }) {
  return (
    <header className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <h1 className="text-xl font-bold">SkyPulse Weather</h1>
      <button
        onClick={onGeolocation}
        className="p-2 bg-blue-500 hover:bg-blue-700 rounded"
      >
        Use Current Location
      </button>
    </header>
  )
}
