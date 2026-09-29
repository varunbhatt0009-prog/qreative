'use client'

import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Link2, ShieldCheck, Lock, ArrowRight, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Q_LOGO = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='black'/%3E%3Ctext x='50' y='74' font-family='sans-serif' font-size='70' font-weight='900' fill='white' text-anchor='middle'%3EQ%3C/text%3E%3C/svg%3E"

export default function Home() {
  const [url, setUrl] = useState('')
  const router = useRouter()

  const handleUnlock = () => {
    if (url) {
      router.push(`/login?url=${encodeURIComponent(url)}`)
    } else {
      router.push('/login')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#050505] text-white font-sans selection:bg-green-900 selection:text-green-400 overflow-hidden relative">
      
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-green-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <nav className="w-full border-b border-gray-900/50 p-4 flex justify-between items-center bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white text-black rounded-md flex items-center justify-center font-bold text-xl">Q</div>
          <span className="font-semibold text-lg tracking-tight">Qreative</span>
        </div>
        <div className="flex gap-4 items-center">
          <button onClick={() => router.push('/login')} className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">Log In</button>
          <button onClick={() => router.push('/login')} className="px-4 py-2 text-sm font-medium bg-white text-black rounded-md hover:bg-gray-200 transition-colors flex items-center gap-2">
            Sign Up Free
          </button>
        </div>
      </nav>

      <main className="flex-1 w-full max-w-5xl px-6 py-8 flex flex-col items-center justify-center relative z-10">
        
        <div className="text-center mb-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-950/40 border border-green-900/50 text-green-400 text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(34,197,94,0.1)]">
            <ShieldCheck size={14} /> Ultra-Secure Generation
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter bg-gradient-to-b from-white via-gray-200 to-gray-500 bg-clip-text text-transparent leading-tight">
            Create codes <br/>that convert.
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-base md:text-lg font-medium">
            Generate instantly, customize infinitely, and protect your business with our military-grade Safe-Scan technology.
          </p>
        </div>

        <div className="w-full max-w-4xl bg-black/40 backdrop-blur-2xl border border-gray-800/80 rounded-3xl p-3 shadow-2xl flex flex-col md:flex-row gap-4 relative">
          
          <div className="absolute inset-0 rounded-3xl border border-white/5 pointer-events-none"></div>

          <div className="flex-1 p-6 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={20} className="text-green-400" />
              <h2 className="text-xl font-bold">Try the Engine</h2>
            </div>
            
            <label className="text-sm font-bold text-gray-400 mb-2 block uppercase tracking-wider">Destination URL</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-transform group-focus-within:scale-110">
                <Link2 className="h-5 w-5 text-gray-500 group-focus-within:text-green-400 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="https://your-menu-or-website.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-gray-800 text-white rounded-2xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all placeholder:text-gray-600 text-base shadow-inner"
              />
            </div>
            
            <div className="mt-5 p-3.5 bg-red-950/20 border border-red-900/30 rounded-xl flex gap-3 text-sm text-red-400/80 leading-relaxed">
              <Lock className="shrink-0 mt-0.5" size={16} />
              <p>For your security, anonymous downloads are strictly prohibited. Sign in to verify your identity and download your secure Safe-Scan code.</p>
            </div>
          </div>

          <div className="w-full md:w-80 bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden group">
            
            <div className={`bg-white p-3 rounded-2xl transition-all duration-700 ${url.length > 0 ? 'blur-md scale-95 opacity-50' : 'blur-none scale-100 opacity-100'}`}>
              <QRCodeSVG 
                value={url || 'qreativeapp.vercel.app'} 
                size={160}
                level="H"
                includeMargin={false}
                imageSettings={{ src: Q_LOGO, height: 35, width: 35, excavate: true }}
              />
            </div>

            <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${url.length > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
               <div className="w-14 h-14 bg-black border border-gray-700 rounded-full flex items-center justify-center mb-3 shadow-2xl">
                 <Lock size={24} className="text-white" />
               </div>
               <p className="text-white font-bold text-lg mb-1">Preview Generated</p>
               <p className="text-gray-400 text-xs mb-5 px-8 text-center">Account required to export</p>
               
               <button 
                onClick={handleUnlock}
                className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-200 hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
               >
                 Sign In & Download <ArrowRight size={16} />
               </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}