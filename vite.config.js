import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Configuración de build optimizada para producción
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // No generar sourcemaps en producción
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    }
  },
  
  // Configuración para desarrollo con host
  server: {
    host: true,
    port: 5173
  },
  
  // PWA y metadatos
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0')
  }
})
