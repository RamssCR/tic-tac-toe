import { afterEach, vi } from 'vitest'

afterEach(() => {
  vi.clearAllMocks()
  vi.resetAllMocks()
  vi.restoreAllMocks()
  vi.useRealTimers()
})

vi.stubEnv('VITE_APP_VERSION', 'test')
vi.stubEnv('NODE_ENV', 'test')
