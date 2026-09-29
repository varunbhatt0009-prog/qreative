import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { ShieldCheck, ShieldAlert, ArrowRight } from 'lucide-react'

export default async function SafeScan(props: { params: Promise<{ code: string }> }) {
  // FIX: Next.js requires us to 'await' the URL parameters before reading them
  const params = await props.params;
  const safeCode = params.code;

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

  // 1. Look up the code in the database using the awaited safeCode
  const { data: qrCode } = await supabase
    .from('qr_codes')
    .select('*')
    .eq('safe_scan_code', safeCode)
    .single()

  // 2. If someone scans a fake or deleted code, stop them immediately
  if (!qrCode) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 text-white">
         <div className="bg-[#0a0a0a] border border-red-900 rounded-2xl p-8 max-w-md w-full text-center">
           <ShieldAlert size={48} className="text-red-500 mx-auto mb-4" />
           <h1 className="text-2xl font-bold mb-2">Invalid Code</h1>
           <p className="text-gray-400">This QR code does not exist or has been deactivated.</p>
         </div>
      </div>
    )
  }

  // 3. Automatically add +1 to the scan counter
  await supabase
    .from('qr_codes')
    .update({ scans: qrCode.scans + 1 })
    .eq('id', qrCode.id)

  // 4. Show the protective warning screen
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 text-white font-sans">
      <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl text-center relative overflow-hidden">
        
        {/* Background glowing effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-green-500/20 blur-[50px] rounded-full pointer-events-none"></div>

        <div className="relative z-10">
          <div className="w-16 h-16 bg-black border border-green-900/50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
            <ShieldCheck size={32} className="text-green-500" />
          </div>
          
          <h1 className="text-2xl font-bold tracking-tight mb-2">Safe-Scan Verified</h1>
          <p className="text-gray-400 text-sm mb-8">
            You are leaving Qreative to visit an external site. We have verified this link format, but please ensure you trust the destination.
          </p>

          <div className="bg-black border border-gray-800 rounded-xl p-4 mb-8 text-left overflow-hidden">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Destination URL</p>
            <p className="text-green-400 font-mono text-sm truncate">{qrCode.destination_url}</p>
          </div>

          <a 
            href={qrCode.destination_url}
            className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            Continue to Site <ArrowRight size={18} />
          </a>
        </div>
        
        <div className="mt-8 text-xs text-gray-600 font-medium uppercase tracking-widest">
          Protected by Qreative
        </div>
      </div>
    </div>
  )
}