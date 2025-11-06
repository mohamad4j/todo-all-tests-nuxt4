import { describe, it, expect, vi } from 'vitest'

vi.mock('#app', () => ({
    useRuntimeConfig: () => ({
        public: {
            SUPABASE_URL: 'https://fake.supabase.co',
            SUPABASE_ANON_KEY: 'fake-key'
        }
    })
}))
import { useApi } from '@/composables/api'

describe('useApi composable', () => {
    it('returns the same instance on multiple calls', () => {
        const api1 = useApi()
        const api2 = useApi()
        expect(api1).toBe(api2)
    })
})
