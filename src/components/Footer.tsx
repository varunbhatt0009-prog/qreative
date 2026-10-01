import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-900 bg-black/90 py-8 px-6 text-xs text-gray-500">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-bold text-white text-sm">Qreative</span> — Next-Gen QR Infrastructure
        </div>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
          <Link href="/dashboard" className="hover:text-gray-300 transition-colors">Dashboard</Link>
        </div>
        <div>
          © {new Date().getFullYear()} Qreative. All rights reserved.
        </div>
      </div>
    </footer>
  )
}