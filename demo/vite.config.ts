import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   base: "/probably-a-table/",
   resolve: {
    dedupe: ["react", "react-dom"]
  }
})
