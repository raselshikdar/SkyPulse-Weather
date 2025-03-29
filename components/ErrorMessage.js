export default function ErrorMessage({ message }) {
  return (
    <div className="animate-fade-in max-w-md mx-auto p-4 mb-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
      ⚠️ {message}
    </div>
  )
}
