// tests/setup.ts
import { vi } from 'vitest'

vi.mock('#imports', () => {
    return {
        useRuntimeConfig: () => ({
        public: {
            SUPABASE_URL: 'https://fake.supabase.co',
            SUPABASE_ANON_KEY: 'fake-key'
        },
        }),
    };
});

