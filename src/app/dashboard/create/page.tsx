import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Link2, ShieldCheck, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default async function CreateCode() {
  async function createSafeCode(formData: FormData) {
    'use server'
    
    const destinationUrl = formData.get('destinationUrl') as string
    if (!destinationUrl) return

    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) { return cookieStore.get(name)?.value }
        }
      }
    )

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const safeCode = Math.random().toString(36).substring(2, 8)

    const { error } = await supabase.from('qr_codes').insert({
      user_id: user.id,
      destination_url: destinationUrl,
      safe_scan_code: safeCode
    })

    if (!error) {
      redirect('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans p-6">
      <div className="max-w-2xl mx-auto mt-12">
        
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Hub
        </Link>

        <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-950/50 text-green-500 rounded-xl flex items-center justify-center">
              <ShieldCheck size={24} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Create Secure Code</h1>
          </div>
          <p className="text-gray-400 mb-8 ml-13">
            Enter the destination URL (e.g., your restaurant's PDF menu). We will wrap it in our Safe-Scan technology.
          </p>

          <form action={createSafeCode} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Destination URL</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Link2 className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="url"
                  name="destinationUrl"
                  required
                  placeholder="https://example.com/menu.pdf"
                  className="w-full bg-black border border-gray-800 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all placeholder:text-gray-600"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              Generate Safe-Scan Link
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}