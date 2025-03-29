# SkyPulse-Weather

This is an advanced, feature-rich weather forecast website built with Next.js and Tailwind CSS. It includes:
- Server‑side rendering and API routes with Next.js
- A 5‑day forecast powered by the OpenWeather One Call API
- Geolocation support to detect the user’s current location
- A modern, responsive design using Tailwind CSS

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/nextjs-weather-app.git
   cd nextjs-weather-app
   ```
   2. Install Dependencies

```
npm install
```

3. **Configure Environment Variables**

- Create a .env.local file in the root directory.

- Add your OpenWeather API key:

```
OPENWEATHER_API_KEY=your-api-key-here
```

4. **Run in Development**

```
npm run dev
```

- Visit http://localhost:3000


5. **Build & Start in Production**

```
npm run build
npm start
```

### Deployment

You can deploy this app on Vercel. Make sure to set your OPENWEATHER_API_KEY in Vercel’s Environment Variables.

---
