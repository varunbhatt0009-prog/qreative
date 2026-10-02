'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { ArrowLeft, ShieldCheck, Link as LinkIcon, Loader2, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function CreateCode() {
  const [url, setUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('') // Proactive error handling
  const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Generate a random 6-character Safe-Scan ID
  const generateCode = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
    return Array.from({length: 6}, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!url) {
      setError("Please enter a destination URL first.")
      return
    }

    // Basic URL validation
    let finalUrl = url
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl
    }

    try {
      setIsSubmitting(true)

      // 1. Ensure the user is actually authenticated before trying to insert
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) throw new Error("Authentication error. Please log out and log back in.")

      const safeScanCode = generateCode()

      // 2. Insert into the database with explicit user_id mapping
      const { error: insertError } = await supabase
        .from('qr_codes')
        .insert({
          destination_url: finalUrl,
          safe_scan_code: safeScanCode,
          user_id: user.id,
          is_active: true,
          scans: 0
        })

      if (insertError) {
        console.error("Insert error:", insertError)
        throw new Error(insertError.message || "The database rejected the code creation.")
      }

      // 3. Success! Force a router refresh so the new code appears, then redirect to Dashboard
      router.refresh() 
      router.push(`/dashboard?newCode=${safeScanCode}`)

    } catch (err: any) {
      console.error(err)
      setError(err.message || "An unexpected error occurred while generating.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans p-6 md:p-12">
      <div className="max-w-2xl mx-auto">
        
        {/* Back Link */}
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-medium mb-8">
          <ArrowLeft size={18} /> Back to Hub
        </Link>

        {/* Main Card */}
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-3xl p-6 md:p-10 shadow-2xl">
          
          <div className="flex items-start gap-4 mb-8">
            <div className="w-12 h-12 bg-green-950/30 border border-green-900/50 rounded-2xl flex items-center justify-center shrink-0">
              <ShieldCheck className="text-green-500" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-2">Create Secure Code</h1>
              <p className="text-gray-400 text-sm leading-relaxed">
                Enter the destination URL (e.g., your restaurant's PDF menu). We will wrap it in our Safe-Scan technology.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Error Message Box */}
            {error && (
              <div className="bg-red-950/30 border border-red-900/50 p-4 rounded-xl flex items-start gap-3">
                <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
                <p className="text-red-400 text-sm font-medium">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">Destination URL</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LinkIcon className="h-5 w-5 text-gray-500 group-focus-within:text-white transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full bg-black border border-gray-800 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-green-500/50 transition-all placeholder:text-gray-600 shadow-inner"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-black py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <><Loader2 className="animate-spin" size={20} /> Generating Secure Link...</>
              ) : (
                "Generate Safe-Scan Link"
              )}
            </button>
          </form>
          
        </div>
      </div>
    </div>
  )
}