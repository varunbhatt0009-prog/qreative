import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error(`🔴 MISSING KEYS: URL is ${url ? 'Found' : 'Missing'} | ANON_KEY is ${key ? 'Found' : 'Missing'}`)
  }

  return createBrowserClient(url!, key!)
}