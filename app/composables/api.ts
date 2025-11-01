// composables/useApi.ts
import { createClient } from '@supabase/supabase-js'

let supabase: ReturnType<typeof createClient> | null = null

export const useApi = () => {
    if (supabase) return supabase

    const config = useRuntimeConfig()
    supabase = createClient(
        config.public.SUPABASE_URL,
        config.public.SUPABASE_ANON_KEY
    )

    return supabase
}
