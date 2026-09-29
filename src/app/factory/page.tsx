import Link from 'next/link'
import Script from 'next/script'
import { ShieldAlert, Home, ExternalLink } from 'lucide-react'

export default function SecretFactory() {
  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      {/* 
        This is the magic script that allows Next.js to natively understand AI components 
        without using blocked iframes. 
      */}
      <Script type="module" src="https://gradio.s3-us-west-2.amazonaws.com/4.44.1/gradio.js" strategy="lazyOnload" />
      
      <nav className="w-full border-b border-red-900/50 p-4 bg-red-950/20 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <ShieldAlert className="text-red-500" size={24} />
          <span className="font-bold text-red-500 tracking-widest uppercase text-sm">Top Secret Admin Factory</span>
        </div>
        <div className="flex items-center gap-4">
          <a 
            href="https://huggingface.co/spaces/huggingface-projects/QR-code-AI-art-generator" 
            target="_blank" 
            rel="noreferrer" 
            className="text-red-400 hover:text-red-300 flex items-center gap-1.5 text-xs font-bold bg-red-950/40 px-3 py-2 rounded-lg border border-red-900/50 transition-colors"
          >
            <ExternalLink size={14} /> Open Secure Window
          </a>
          <Link href="/dashboard" className="text-gray-400 hover:text-white flex items-center gap-2 text-sm transition-colors">
            <Home size={16} /> Dashboard
          </Link>
        </div>
      </nav>

      <main className="flex-grow flex flex-col p-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-white mb-1">3D QR Masterpiece Generator</h1>
          <p className="text-gray-400 text-sm">Running natively via Gradio Web Component. Bypassing iframe restrictions.</p>
        </div>
        
        <div className="w-full flex-grow rounded-2xl overflow-hidden border-2 border-gray-800 shadow-[0_0_50px_rgba(0,255,100,0.1)] bg-[#0b0f19]">
          {/* 
            We use dangerouslySetInnerHTML so TypeScript doesn't get confused 
            by the custom <gradio-app> HTML tag. 
          */}
          <div 
            className="w-full h-full min-h-[800px]"
            dangerouslySetInnerHTML={{ 
              __html: '<gradio-app src="https://huggingface-projects-qr-code-ai-art-generator.hf.space" theme_mode="dark" style="width: 100%; height: 100%; min-height: 800px; display: block;"></gradio-app>' 
            }} 
          />
        </div>
      </main>
    </div>
  )
}