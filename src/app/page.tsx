'use client'

import { useState, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { 
  Link2, ShieldCheck, Lock, Sparkles, Smartphone, 
  MessageCircle, Camera, LayoutGrid, Download, Loader2 
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import Footer from '@/components/Footer'
import { createBrowserClient } from '@supabase/ssr'

const Q_LOGO = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='black'/%3E%3Ctext x='50' y='74' font-family='sans-serif' font-size='70' font-weight='900' fill='white' text-anchor='middle'%3EQ%3C/text%3E%3C/svg%3E"

export default function Home() {
  const [url, setUrl] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) setIsLoggedIn(true)
    }
    checkUser()
  }, [supabase.auth])

  const handleGenerateAndDownload = async () => {
    if (!url) {
      alert("Please enter a destination URL first.");
      return;
    }

    if (!isLoggedIn) {
      // Save their work before kicking them to login
      localStorage.setItem('pendingQRUrl', url);
      router.push('/login');
      return;
    }

    try {
      setIsGenerating(true);
      
      await new Promise(resolve => setTimeout(resolve, 800));

      const svgElement = document.getElementById('qr-code-svg');
      if (!svgElement) throw new Error("QR Code engine failed to render.");

      const svgData = new XMLSerializer().serializeToString(svgElement);
      const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const downloadUrl = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'qreative-secure-qr.svg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);

    } catch (error) {
      console.error("Generation error:", error);
      alert("Something went wrong generating your code. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="flex flex-col items-center bg-[#050505] text-white font-sans selection:bg-green-900 selection:text-green-400 w-full min-h-screen">
      
      {/* Navbar */}
      <nav className="w-full border-b border-gray-900/50 p-4 flex justify-between items-center bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-2 pl-4">
          <div className="w-8 h-8 bg-white text-black rounded-md flex items-center justify-center font-bold text-xl">Q</div>
          <span className="font-semibold text-lg tracking-tight">Qreative</span>
        </div>
        <div className="flex gap-4 items-center pr-4">
          {isLoggedIn ? (
            <button onClick={() => router.push('/dashboard')} className="px-5 py-2 text-sm font-medium bg-white text-black rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
              My Dashboard
            </button>
          ) : (
            <>
              <button onClick={() => router.push('/login')} className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">Log In</button>
              <button onClick={() => router.push('/login')} className="px-5 py-2 text-sm font-medium bg-white text-black rounded-lg hover:bg-gray-200 transition-colors">
                Sign Up Free
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Main Generator Section */}
      <main className="w-full max-w-7xl px-4 py-12 flex flex-col relative z-10">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">Professional QR Code Generator</h1>
          <p className="text-gray-400 text-lg">Create, customize, and track secure QR codes for your business.</p>
        </div>

        {/* Split Screen Professional Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT PANEL: Inputs & Design */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Step 1: Input */}
            <div className="bg-[#0a0a0a] border border-gray-800/80 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-400">1</div>
                <h2 className="text-lg font-bold">Select Data Type</h2>
              </div>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 border border-green-500/50 text-green-400 rounded-lg text-sm font-medium"><Link2 size={16}/> Website URL</button>
                <button className="flex items-center gap-2 px-4 py-2 bg-transparent border border-gray-800 text-gray-400 hover:bg-gray-800/30 rounded-lg text-sm font-medium transition-colors"><Smartphone size={16}/> UPI</button>
                <button className="flex items-center gap-2 px-4 py-2 bg-transparent border border-gray-800 text-gray-400 hover:bg-gray-800/30 rounded-lg text-sm font-medium transition-colors"><MessageCircle size={16}/> WhatsApp</button>
                <button className="flex items-center gap-2 px-4 py-2 bg-transparent border border-gray-800 text-gray-400 hover:bg-gray-800/30 rounded-lg text-sm font-medium transition-colors"><Camera size={16}/> Instagram</button>
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Link2 className="h-5 w-5 text-gray-500 group-focus-within:text-green-400 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="https://your-website.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full bg-black border border-gray-800 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-green-500/50 transition-all placeholder:text-gray-600 text-sm shadow-inner"
                />
              </div>
            </div>

            {/* Step 2: Code Style */}
            <div className="bg-[#0a0a0a] border border-gray-800/80 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-400">2</div>
                <h2 className="text-lg font-bold">Choose Code Style</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border-2 border-green-500/50 bg-green-950/10 rounded-xl p-4 text-center cursor-pointer relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-green-500 text-black text-[10px] font-bold px-2 py-1 rounded-bl-lg">PRO</div>
                  <LayoutGrid className="mx-auto mb-2 text-green-400" size={24} />
                  <h3 className="font-bold text-sm">Custom QR</h3>
                  <p className="text-xs text-gray-500 mt-1">Standard scannable</p>
                </div>
                <div className="border border-gray-800 bg-black/50 rounded-xl p-4 text-center opacity-50 cursor-not-allowed">
                  <Sparkles className="mx-auto mb-2 text-gray-500" size={24} />
                  <h3 className="font-bold text-sm text-gray-400">Image QR</h3>
                  <p className="text-xs text-gray-600 mt-1">Coming Soon</p>
                </div>
                <div className="border border-gray-800 bg-black/50 rounded-xl p-4 text-center opacity-50 cursor-not-allowed">
                  <Sparkles className="mx-auto mb-2 text-gray-500" size={24} />
                  <h3 className="font-bold text-sm text-gray-400">AI Art QR</h3>
                  <p className="text-xs text-gray-600 mt-1">Coming Soon</p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT PANEL: Sticky Preview & Download */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-24 bg-[#0a0a0a] border border-gray-800/80 rounded-2xl p-6 shadow-2xl flex flex-col items-center text-center">
              
              <div className="flex items-center gap-2 mb-6 w-full justify-start">
                <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-400">3</div>
                <h2 className="text-lg font-bold">Preview & Export</h2>
              </div>

              {/* QR Render Box */}
              <div className="bg-white p-4 rounded-2xl mb-6 shadow-[0_0_40px_rgba(255,255,255,0.1)] w-full flex justify-center">
                <QRCodeSVG 
                  id="qr-code-svg"
                  value={url || 'https://qreative.online'} 
                  size={200}
                  level="H"
                  includeMargin={false}
                  imageSettings={{ src: Q_LOGO, height: 45, width: 45, excavate: true }}
                />
              </div>

              {/* Scannability Bar UI Mimic */}
              <div className="w-full mb-6">
                <div className="flex justify-between text-xs font-bold text-gray-500 mb-2">
                  <span>Scannability</span>
                  <span className="text-green-400">High</span>
                </div>
                <div className="w-full h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-green-500 shadow-md"></div>
                </div>
              </div>

              {!isLoggedIn && (
                <div className="w-full mb-4 p-3 bg-gray-900/50 border border-gray-800 rounded-lg flex items-start gap-3 text-left">
                  <Lock className="text-gray-400 shrink-0 mt-0.5" size={16} />
                  <p className="text-xs text-gray-400">Sign in required to securely export and save your QR configuration.</p>
                </div>
              )}

              <button 
                onClick={handleGenerateAndDownload}
                disabled={isGenerating}
                className="w-full bg-white text-black py-3.5 rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isGenerating ? (
                  <><Loader2 size={18} className="animate-spin" /> Processing...</>
                ) : !isLoggedIn ? (
                  <><ShieldCheck size={18}/> Sign in & Download SVG</>
                ) : (
                  <><Download size={18}/> Generate & Download SVG</>
                )}
              </button>

            </div>
          </div>

        </div>
      </main>

      {/* Social Proof Divider */}
      <div className="w-full border-y border-gray-900 mt-20 bg-[#0a0a0a]/50 py-10 flex flex-col items-center">
        <p className="text-[10px] font-black tracking-[0.2em] text-gray-500 uppercase mb-8">Companies of all sizes trust us</p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 grayscale items-center text-xl md:text-2xl font-black px-4">
           <span>STATION F</span>
           <span className="font-serif italic">IKEA</span>
           <span className="font-light tracking-tighter">Schneider</span>
           <span className="uppercase tracking-widest font-normal">Jaguar</span>
           <span className="italic">UFC</span>
        </div>
      </div>

      <Footer />
    </div>
  )
}