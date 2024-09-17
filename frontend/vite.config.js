import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/send': 'http://localhost:3000', // Adjust the target if your API is on a different port or address
  //   },
  // },
});
