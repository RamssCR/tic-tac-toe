import { coverageConfigDefaults, defineConfig } from 'vitest/config'
import { loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import paths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isProduction = mode === 'production'

  return {
    define: {
      __APP_VERSION__: JSON.stringify(env.VITE_APP_VERSION ?? 'development'),
      __IS_STAGING__: JSON.stringify(mode === 'staging'),
    },
    plugins: [
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler']],
        },
      }),
      tailwindcss(),
      paths(),
    ],
    server: {
      open: true,
    },
    build: {
      sourcemap: isProduction ? false : 'inline',
      minify: isProduction ? 'esbuild' : false,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            tailwindcss: ['tailwindcss', '@tailwindcss/vite'],
          },
        },
      },
    },
    test: {
      environment: 'jsdom',
      setupFiles: ['test/setupTest.ts'],
      reporters: process.env.GITHUB_ACTIONS ? ['github-actions'] : ['dot'],
      coverage: {
        provider: 'v8',
        reportsDirectory: 'coverage',
        reporter: ['text', 'lcov'],
        exclude: [
          '**/*.config.*',
          'html/**',
          'src/data/**',
          'src/main.tsx',
          'test/**',
          'public/**',
          'src/App.tsx',
          'src/variants/**',
          'scripts/**',
          ...coverageConfigDefaults.exclude,
        ],
      },
    },
  }
})
