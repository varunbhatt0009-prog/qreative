'use client'

import { useState, useEffect } from 'react'
import { Download, Printer, X, FileImage, FileCode2 } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

const Q_LOGO = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='black'/%3E%3Ctext x='50' y='74' font-family='sans-serif' font-size='70' font-weight='900' fill='white' text-anchor='middle'%3EQ%3C/text%3E%3C/svg%3E"

export default function DownloadBtn({ qrId, destination, autoOpen = false }: { qrId: string, destination: string, autoOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(autoOpen)

  useEffect(() => {
    if (autoOpen) {
      setIsOpen(true)
      window.history.replaceState(null, '', '/dashboard')
    }
  }, [autoOpen])

  // 1. HIGH-RES PNG EXPORT
  const handleDownloadPNG = () => {
    const svg = document.getElementById(`high-res-qr-${qrId}`)
    if (!svg) return
    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()
    img.onload = () => {
      canvas.width = img.width + 100
      canvas.height = img.height + 100
      if (ctx) {
         ctx.fillStyle = "white"
         ctx.fillRect(0, 0, canvas.width, canvas.height)
         ctx.drawImage(img, 50, 50)
      }
      const pngFile = canvas.toDataURL("image/png", 1.0)
      const downloadLink = document.createElement("a")
      downloadLink.download = `Qreative-Premium-${qrId}.png`
      downloadLink.href = pngFile
      downloadLink.click()
    }
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`
  }

  // 2. NEW: VECTOR SVG EXPORT (For Pro Designers & Print Shops)
  const handleDownloadSVG = () => {
    const svg = document.getElementById(`high-res-qr-${qrId}`)
    if (!svg) return
    const svgData = new XMLSerializer().serializeToString(svg)
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const downloadLink = document.createElement("a")
    downloadLink.href = url
    downloadLink.download = `Qreative-Vector-${qrId}.svg`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }

  // 3. DIRECT BROWSER PRINT
  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    if (!printWindow) return
    const svg = document.getElementById(`high-res-qr-${qrId}`)
    if (!svg) return
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Premium QR - ${qrId}</title>
          <style>
            body { display: flex; flex-direction: column; align-items: center; margin: 0; font-family: system-ui, -apple-system, sans-serif; }
            .container { text-align: center; width: 100%; max-width: 800px; padding-top: 50px; }
            h2 { font-size: 28px; color: #000; margin-bottom: 10px; font-weight: bold; }
            p.dest { font-size: 16px; color: #555; margin-bottom: 50px; word-break: break-all; }
            .qr-wrapper { display: flex; justify-content: center; width: 100%; }
            svg { width: 100%; max-width: 500px; height: auto; }
            @media print {
              @page { margin: 2cm; size: portrait; }
              body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              svg { max-width: 14cm; max-height: 14cm; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Scan for Menu / Information</h2>
            <p class="dest">${destination}</p>
            <div class="qr-wrapper">${svg.outerHTML}</div>
          </div>
          <script>setTimeout(() => { window.print(); window.close(); }, 200);</script>
        </body>
      </html>
    `)
    printWindow.document.close()
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="mt-3 w-full py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 border border-gray-800"
      >
        <Printer size={16} /> Print & Export
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-8 max-w-lg w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors bg-gray-900/50 p-2 rounded-full">
              <X size={20} />
            </button>
            
            <h2 className="text-2xl font-bold text-white mb-2">Print & Export Studio</h2>
            <p className="text-gray-400 mb-8 text-sm">Download premium assets for professional restaurant menus, table tents, and billboards.</p>
            
            <div className="bg-white p-6 rounded-2xl flex justify-center items-center mb-8 mx-auto w-fit shadow-[0_0_40px_rgba(255,255,255,0.1)]">
              <QRCodeSVG 
                id={`high-res-qr-${qrId}`}
                value={`https://qreativeapp.vercel.app/s/${qrId}`} 
                size={1024} 
                className="w-48 h-48" 
                level="H"
                includeMargin={false}
                imageSettings={{ src: Q_LOGO, height: 250, width: 250, excavate: true }}
              />
            </div>

            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <button onClick={handleDownloadPNG} className="py-4 bg-gray-900 hover:bg-gray-800 border border-gray-700 text-white font-bold rounded-xl transition-colors flex flex-col items-center gap-2">
                  <FileImage size={24} className="text-blue-400" /> 
                  <span className="text-sm">4K PNG</span>
                </button>
                
                <button onClick={handleDownloadSVG} className="py-4 bg-green-950/20 hover:bg-green-900/40 border border-green-900/50 text-white font-bold rounded-xl transition-colors flex flex-col items-center gap-2 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                  <FileCode2 size={24} className="text-green-400" /> 
                  <span className="text-sm">Vector SVG</span>
                </button>
              </div>
              
              <button onClick={handlePrint} className="w-full py-4 bg-white hover:bg-gray-200 text-black font-bold rounded-xl transition-colors flex items-center justify-center gap-2 mt-1">
                <Printer size={20} className="text-black" /> Direct Print Copies
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}