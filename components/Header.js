import { FiMapPin } from 'react-icons/fi'

export default function Header({ onGeolocation }) {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
      <h1 className="text-3xl font-bold text-primary dark:text-white flex items-center gap-2">
        <FiMapPin className="inline-block" />
        SkyPulse
      </h1>
      
      <button 
        onClick={onGeolocation}
        className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
      >
        <FiMapPin />
        Detect My Location
      </button>
    </header>
  )
}
