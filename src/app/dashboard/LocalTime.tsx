'use client'

import { useEffect, useState } from 'react'
import { Calendar } from 'lucide-react'

export default function LocalTime({ timestamp }: { timestamp: string }) {
  const [formatted, setFormatted] = useState<string>('Loading time...')

  useEffect(() => {
    // This runs in the browser, so it automatically detects the user's timezone (like IST)
    const d = new Date(timestamp)
    const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    const timeStr = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    
    setFormatted(`${dateStr} at ${timeStr}`)
  }, [timestamp])

  return (
    <span className="text-gray-600 text-xs flex items-center gap-1 shrink-0 ml-auto sm:ml-2">
      <Calendar size={12} /> {formatted}
    </span>
  )
}