'use client'

import { useState } from 'react'
import { Trash2, PauseCircle, PlayCircle, Loader2 } from 'lucide-react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

export default function CodeActions({ id, isActive }: { id: string, isActive: boolean }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const togglePause = async () => {
    setIsLoading(true)
    await supabase.from('qr_codes').update({ is_active: !isActive }).eq('id', id)
    setIsLoading(false)
    router.refresh()
  }

  const deleteCode = async () => {
    if (!confirm('Are you sure you want to delete this QR code permanently?')) return
    setIsLoading(true)
    await supabase.from('qr_codes').delete().eq('id', id)
    setIsLoading(false)
    router.refresh()
  }

  return (
    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-800/60 w-full">
      <button 
        onClick={togglePause} 
        disabled={isLoading}
        className={`flex items-center justify-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg transition-colors flex-1 ${isActive ? 'bg-yellow-950/30 text-yellow-500 hover:bg-yellow-950/50 border border-yellow-900/30' : 'bg-green-950/30 text-green-400 hover:bg-green-950/50 border border-green-900/30'}`}
      >
        {isLoading ? <Loader2 size={14} className="animate-spin"/> : isActive ? <PauseCircle size={14}/> : <PlayCircle size={14}/>}
        {isActive ? 'Pause Link' : 'Resume Link'}
      </button>
      
      <button 
        onClick={deleteCode}
        disabled={isLoading} 
        className="flex items-center justify-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg bg-red-950/20 text-red-400 hover:bg-red-950/40 border border-red-900/30 transition-colors flex-1"
      >
        {isLoading ? <Loader2 size={14} className="animate-spin"/> : <Trash2 size={14}/>}
        Delete Code
      </button>
    </div>
  )
}