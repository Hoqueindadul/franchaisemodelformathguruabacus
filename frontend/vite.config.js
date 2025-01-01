import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000, // Increase limit to 1MB
    
    // Rollup options for manual chunking
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Separate vendor libraries
            return 'vendor';
          }
          if (id.includes('chart.js')) {
            // Example of separating a specific library
            return 'chart';
          }
        },
      },
    },
  },
});
