import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Transport Geography Learning Platform</title>
        
        {/* Tailwind CSS */}
        <script src="https://cdn.tailwindcss.com"></script>
        
        {/* Font Awesome Icons */}
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        
        {/* Leaflet for interactive maps */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css" />
        
        {/* Chart.js for data visualization */}
        <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js"></script>
        
        {/* Custom styles */}
        <link href="/static/style.css" rel="stylesheet" />
        
        <style>
          {`
            body { 
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; 
            }
            .glass-effect {
              backdrop-filter: blur(10px);
              background: rgba(255, 255, 255, 0.1);
              border: 1px solid rgba(255, 255, 255, 0.2);
            }
            .transport-mode-card {
              transition: all 0.3s ease;
              cursor: pointer;
            }
            .transport-mode-card:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            }
            .scenario-card {
              transition: all 0.3s ease;
              cursor: pointer;
            }
            .scenario-card:hover {
              transform: scale(1.02);
              box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            }
          `}
        </style>
      </head>
      <body class="antialiased">
        {children}
        
        {/* Leaflet JavaScript */}
        <script src="https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js"></script>
        
        {/* Axios for API calls */}
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        
        {/* Educational content and game JavaScript */}
        <script src="/static/educational-content.js"></script>
        <script src="/static/game.js"></script>
      </body>
    </html>
  )
})
