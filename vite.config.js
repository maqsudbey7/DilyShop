import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  base: './', // barcha fayllarni index.html joylashgan joydan qidiradi
});
