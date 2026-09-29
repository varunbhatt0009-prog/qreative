'use client'

import { useState, useEffect } from 'react'
import { Download, Printer, X } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

const Q_LOGO = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='black'/%3E%3Ctext x='50' y='74' font-family='sans-serif' font-size='70' font-weight='900' fill='white' text-anchor='middle'%3EQ%3C/text%3E%3C/svg%3E"

// NEW: Added the autoOpen prop
export default function DownloadBtn({ qrId, destination, autoOpen = false }: { qrId: string, destination: string, autoOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(autoOpen)

  // NEW: Automatically open the modal if the dashboard tells it to
  useEffect(() => {
    if (autoOpen) {
      setIsOpen(true)
      // Clean up the URL so it doesn't pop open again if they refresh
      window.history.replaceState(null, '', '/dashboard')
    }
  }, [autoOpen])

  const handleDownload = () => {
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
            .container { text-align: center; width: 100%; max-width: 800px; }
            h2 { font-size: 24px; color: #000; margin-bottom: 10px; font-weight: bold; }
            p.dest { font-size: 16px; color: #555; margin-bottom: 40px; word-break: break-all; }
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
          <script>setTimeout(() => { window.print(); window.close(); }, 100);</script>
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-8 max-w-lg w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-white mb-2">Print & Export Studio</h2>
            <p className="text-gray-400 mb-8">Generate premium branded assets for your restaurant menus or table tents.</p>
            <div className="bg-white p-4 rounded-xl flex justify-center items-center mb-8 mx-auto w-fit">
              <QRCodeSVG 
                id={`high-res-qr-${qrId}`}
                value={`http://localhost:3000/s/${qrId}`} 
                size={1024} 
                className="w-48 h-48" 
                level="H"
                includeMargin={false}
                imageSettings={{ src: Q_LOGO, height: 250, width: 250, excavate: true }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={handleDownload} className="py-4 bg-gray-900 hover:bg-gray-800 border border-gray-700 text-white font-bold rounded-xl transition-colors flex flex-col items-center gap-2">
                <Download size={24} className="text-green-400" /> Download 4K PNG
              </button>
              <button onClick={handlePrint} className="py-4 bg-white hover:bg-gray-200 text-black font-bold rounded-xl transition-colors flex flex-col items-center gap-2">
                <Printer size={24} className="text-black" /> Print Copies
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}