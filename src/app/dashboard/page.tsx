import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ShieldCheck, Plus, LogOut, Clock, Link as LinkIcon, Lock, Home as HomeIcon, FolderKanban } from 'lucide-react'
import Link from 'next/link'
import { QRCodeSVG } from 'qrcode.react'
import DownloadBtn from './DownloadBtn'

const Q_LOGO = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='black'/%3E%3Ctext x='50' y='74' font-family='sans-serif' font-size='70' font-weight='900' fill='white' text-anchor='middle'%3EQ%3C/text%3E%3C/svg%3E"

export default async function Dashboard(props: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const searchParams = await props.searchParams
  const newCode = searchParams?.newCode
  
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

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: qrCodes } = await supabase
    .from('qr_codes')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const trialEnd = new Date(profile?.trial_ends_at || Date.now())
  const daysLeft = Math.max(0, Math.ceil((trialEnd.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      
      {/* UPGRADED NAVIGATION BAR */}
      <nav className="w-full border-b border-gray-900 p-4 flex justify-between items-center bg-black sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white text-black rounded-md flex items-center justify-center font-bold text-xl">Q</div>
            <span className="font-semibold text-lg tracking-tight hidden sm:block">Qreative</span>
          </div>
          
          {/* NEW: Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5">
              <HomeIcon size={16} /> Home
            </Link>
            <Link href="/dashboard" className="text-white flex items-center gap-1.5 border-b-2 border-green-500 pb-0.5">
              <ShieldCheck size={16} /> Dashboard
            </Link>
            <button className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer">
              <FolderKanban size={16} /> Contents
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          
          {/* NEW: Limited Access Badge for New / Free Trial Users */}
          {!profile?.is_premium && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-950/40 border border-yellow-900/50 rounded-lg text-yellow-500 text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(234,179,8,0.1)]">
              <Lock size={12} /> Limited Access
            </div>
          )}
          
          <span className="text-sm text-gray-400 hidden sm:block ml-2">{user.email}</span>
          <form action="/auth/signout" method="post">
            <button className="text-sm font-medium text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors">
              <LogOut size={16} /> Sign Out
            </button>
          </form>
        </div>
      </nav>

      {/* MAIN DASHBOARD CONTENT */}
      <main className="max-w-6xl mx-auto p-6 mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="md:col-span-1 space-y-6">
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="text-green-400" size={20} />
              <h2 className="font-semibold text-lg">Trial Status</h2>
            </div>
            {profile?.is_premium ? (
              <div className="p-4 bg-green-950/30 border border-green-900 rounded-xl text-green-400">
                <p className="font-semibold">Premium Active</p>
                <p className="text-sm mt-1 text-green-500/80">Unlimited Safe-Scans</p>
              </div>
            ) : (
              <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl">
                <p className="text-3xl font-bold text-white mb-1">{daysLeft} <span className="text-sm text-gray-400 font-normal">days left</span></p>
                <div className="w-full bg-gray-800 rounded-full h-1.5 mb-4 mt-3">
                  <div className="bg-green-400 h-1.5 rounded-full" style={{ width: `${(daysLeft / 30) * 100}%` }}></div>
                </div>
                <button className="w-full py-2 bg-white text-black rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors">
                  Upgrade to Premium
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold tracking-tight">Your Secure Codes</h2>
            <Link href="/dashboard/create" className="px-4 py-2 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400 transition-colors flex items-center gap-2 text-sm">
              <Plus size={16} /> New Safe-Scan Code
            </Link>
          </div>

          {qrCodes && qrCodes.length > 0 ? (
            <div className="space-y-4">
              {qrCodes.map((code) => (
                <div key={code.id} className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row gap-4 sm:items-center justify-between group hover:border-gray-700 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-2 rounded-xl shrink-0">
                      <QRCodeSVG 
                        id={`qr-${code.safe_scan_code}`}
                        value={`http://localhost:3000/s/${code.safe_scan_code}`} 
                        size={80}
                        level="H"
                        includeMargin={false}
                        imageSettings={{ src: Q_LOGO, height: 20, width: 20, excavate: true }}
                      />
                    </div>
                    
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-green-950 text-green-400 border border-green-900/50 rounded text-[10px] font-bold uppercase tracking-wider">Protected</span>
                        <span className="text-gray-500 text-xs font-mono">ID: {code.safe_scan_code}</span>
                      </div>
                      <p className="text-white font-medium truncate mb-1">{code.destination_url}</p>
                      <a href={`http://localhost:3000/s/${code.safe_scan_code}`} target="_blank" rel="noreferrer" className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
                        <LinkIcon size={12} /> localhost:3000/s/{code.safe_scan_code}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 min-w-[140px]">
                    <div className="flex flex-col items-end bg-black/50 p-3 rounded-lg border border-gray-900">
                      <span className="text-2xl font-bold text-white leading-none mb-1">{code.scans}</span>
                      <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-widest">Total Scans</span>
                    </div>
                    <DownloadBtn 
                      qrId={code.safe_scan_code} 
                      destination={code.destination_url} 
                      autoOpen={code.safe_scan_code === newCode}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
             <div className="bg-[#0a0a0a] border border-gray-800 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center text-center">
             <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-4">
               <ShieldCheck size={32} className="text-gray-500" />
             </div>
             <h3 className="text-xl font-bold text-white mb-2">No active codes</h3>
             <p className="text-gray-400 max-w-sm mb-6">Protect your customers and track your menu scans by generating your first Secure QR Code.</p>
             <Link href="/dashboard/create" className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors">
               Create First Code
             </Link>
           </div>
          )}
        </div>
      </main>
    </div>
  )
}