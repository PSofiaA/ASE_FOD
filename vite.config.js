import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from "dotenv"

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  define: {
    'process.env' : {
      VITE_HASH_PASS:
      process.env.VITE_HASH_PASS,
      VITE_USERNAME:
      process.env.VITE_USERNAME,
    },
  },
})
