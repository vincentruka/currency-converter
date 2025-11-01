import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        client: resolve(__dirname, 'src/entry-client.tsx'),
        server: resolve(__dirname, 'src/entry-server.tsx'),
      },
    },
  },
  ssr: {
    noExternal: ['@tanstack/react-query', 'styled-components'],
  },
})