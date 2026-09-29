import Link from 'next/link'
import { ShieldAlert, Home } from 'lucide-react'

export default function SecretFactory() {
  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      {/* Secret Top Navigation */}
      <nav className="w-full border-b border-red-900/50 p-4 bg-red-950/20 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <ShieldAlert className="text-red-500" size={24} />
          <span className="font-bold text-red-500 tracking-widest uppercase text-sm">Top Secret Admin Factory</span>
        </div>
        <Link href="/dashboard" className="text-gray-400 hover:text-white flex items-center gap-2 text-sm transition-colors">
          <Home size={16} /> Back to Dashboard
        </Link>
      </nav>

      {/* The Magic Window to the Cloud Supercomputer */}
      <main className="flex-grow flex flex-col p-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-white mb-2">3D QR Masterpiece Generator</h1>
          <p className="text-gray-400 text-sm">Running on remote cloud GPUs. Cost: $0.00. Your Dell Inspiron RAM is safe.</p>
        </div>
        
        {/* This is the magic window (iframe) that brings the free AI into your site */}
        <div className="w-full flex-grow rounded-2xl overflow-hidden border-2 border-gray-800 shadow-[0_0_50px_rgba(0,255,100,0.1)]">
          <iframe
            src="https://huggingface-projects-qr-code-ai-art-generator.hf.space?__theme=dark"
            frameBorder="0"
            className="w-full h-full min-h-[800px]"
            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; microphone; midi; payment; vr"
          ></iframe>
        </div>
      </main>
    </div>
  )
}