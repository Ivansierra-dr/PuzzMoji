import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Configuración de build optimizada para producción
  build: {
    target: 'es2020',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild'
  },
  
  // Configuración para desarrollo con host
  server: {
    host: true,
    port: 5173
  },
  
  // PWA y metadatos
  define: {
    __APP_VERSION__: JSON.stringify('1.0.0')
  }
})
