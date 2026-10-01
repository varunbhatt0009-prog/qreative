'use client'

import { useEffect } from 'react'
import { MonitorSmartphone } from 'lucide-react'

export default function AdBanner({ adSlot, height = "h-[100px]" }: { adSlot: string, height?: string }) {
  useEffect(() => {
    // This safely triggers Google AdSense to fill the banner when running in production
    if (process.env.NODE_ENV === 'production') {
      try {
        // @ts-ignore
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (err) {
        console.error("AdSense error:", err)
      }
    }
  }, [])

  return (
    <div className={`w-full flex justify-center items-center overflow-hidden bg-[#0a0a0a] border border-gray-800 rounded-xl ${height} relative group`}>
      {/* 
        DEVELOPMENT PLACEHOLDER: 
        This shows up while you are coding so you know exactly where ads will appear.
      */}
      {process.env.NODE_ENV === 'development' ? (
        <div className="flex flex-col items-center gap-2 text-gray-600">
          <MonitorSmartphone size={24} className="group-hover:text-green-500 transition-colors" />
          <span className="text-xs font-bold uppercase tracking-widest font-mono">Premium Ad Placement</span>
          <span className="text-[10px] bg-gray-900 px-2 py-1 rounded text-gray-500">Slot: {adSlot}</span>
        </div>
      ) : (
        /* 
          PRODUCTION AD SENSE CODE: 
          This is what Google uses to inject the actual paying ads when live.
        */
        <ins
          className="adsbygoogle w-full h-full block text-center"
          data-ad-client="ca-pub-YOUR_ADSENSE_ID" // We will update this when you get your AdSense account
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      )}
    </div>
  )
}