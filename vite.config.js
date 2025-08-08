import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  fontFamily: {
    sans: ['Poppins', 'sans-serif'],
  },
  
})
