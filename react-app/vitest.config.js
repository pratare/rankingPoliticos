import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.js'],
    coverage: {
      reporter: ['text', 'html'],
      all: true,
      include: [
        'src/App.jsx',
        'src/app/App.jsx',
        'src/features/ranking/*.jsx',
        'src/domain/*.js',
        'src/services/*.js',
        'src/data/*.js',
        'src/components/layout/*.jsx',
        'src/main.jsx',
      ],
      exclude: ['src/**/*.test.{js,jsx}', 'src/setupTests.js', 'src/components/**', 'src/config/**'],
      lines: 100,
      functions: 100,
      statements: 100,
      branches: 100,
    },
  },
})
