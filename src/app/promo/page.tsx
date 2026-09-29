'use client'

import { useState, useEffect } from 'react'
import { ShieldCheck, QrCode, Lock, ChevronRight } from 'lucide-react'

export default function PromoVideo() {
  const [scene, setScene] = useState(1)

  useEffect(() => {
    // Automatically sequence the video scenes
    const t1 = setTimeout(() => setScene(2), 4000)  // Scene 1: 0-4s
    const t2 = setTimeout(() => setScene(3), 9000)  // Scene 2: 4-9s
    const t3 = setTimeout(() => setScene(4), 15000) // Scene 3: 9-15s
    const t4 = setTimeout(() => setScene(5), 20000) // Scene 4: 15-20s
    
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Phone Screen Container (Instagram Story Ratio) */}
      <div className="w-full max-w-[400px] h-[800px] bg-[#050505] border border-gray-800 rounded-3xl overflow-hidden relative shadow-2xl flex items-center justify-center text-center p-8">
        
        {/* SCENE 1: The Hook (0-4s) */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ${scene === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <QrCode size={100} className="text-red-500 mb-8 animate-pulse" />
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter leading-tight">
            Are your <br/><span className="text-red-500">QR Codes</span> <br/>getting hacked?
          </h1>
        </div>

        {/* SCENE 2: The Creator (4-9s) */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center bg-black transition-opacity duration-1000 ${scene === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <div className="w-16 h-16 bg-white text-black rounded-xl flex items-center justify-center font-bold text-4xl mb-6 shadow-[0_0_40px_rgba(255,255,255,0.3)]">Q</div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Meet Qreative.</h2>
          <p className="text-gray-400 text-lg">Built by Varun Bhatt.</p>
          <div className="mt-8 px-4 py-2 bg-green-900/30 border border-green-500/50 rounded-full flex items-center gap-2 text-green-400 font-medium">
            <ShieldCheck size={20} /> Ultra-Secure Generation
          </div>
        </div>

        {/* SCENE 3: The Demo/Solution (9-15s) */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a] transition-opacity duration-1000 ${scene === 3 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <h2 className="text-3xl font-bold text-white mb-8">Instant. Beautiful.<br/>100% Safe.</h2>
          
          {/* Fake App Interface animating in */}
          <div className="w-full bg-black border border-gray-800 rounded-2xl p-4 animate-bounce">
            <div className="h-10 w-full bg-gray-900 rounded-lg mb-4 flex items-center px-3 text-gray-500 text-sm">
              https://your-menu...
            </div>
            <div className="flex justify-center mb-4">
              <div className="bg-white p-2 rounded-lg">
                <QrCode size={120} className="text-black" />
              </div>
            </div>
            <div className="h-10 w-full bg-white text-black rounded-lg flex items-center justify-center font-bold text-sm">
              Download PNG
            </div>
          </div>
        </div>

        {/* SCENE 4: The Offer (15-20s) */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ${scene === 4 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <div className="w-20 h-20 bg-white text-black rounded-2xl flex items-center justify-center font-bold text-5xl mb-8">Q</div>
          <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
            Premium<br/>Business Setup.
          </h1>
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 mb-12">
            First Month FREE.
          </h2>
          <div className="flex flex-col items-center gap-2 animate-pulse">
            <p className="text-gray-400 font-medium uppercase tracking-widest text-sm">Link in Bio</p>
            <ChevronRight size={24} className="text-white rotate-90" />
          </div>
        </div>

        {/* END SCENE */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ${scene >= 5 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
           <p className="text-gray-600">Animation Complete.</p>
           <button onClick={() => setScene(1)} className="mt-4 text-white underline">Replay</button>
        </div>

      </div>
    </div>
  )
}