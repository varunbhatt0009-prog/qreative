import Link from 'next/link'
import { ArrowLeft, FileText } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans p-6 sm:p-12 max-w-4xl mx-auto">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft size={16} /> Back to Qreative
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <FileText className="text-emerald-400" size={32} />
        <h1 className="text-3xl font-extrabold text-white">Terms of Service</h1>
      </div>
      <p className="text-sm text-gray-500 mb-8">Last Updated: October 2026</p>

      <div className="space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-white mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Qreative, you agree to comply with and be bound by these Terms of Service. If you do not agree, you must discontinue use of the platform immediately.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">2. Acceptable Use Policy</h2>
          <p>
            You agree not to create QR codes that link to phishing pages, malware, illegal content, scams, or malicious payloads. Qreative reserves the right to immediately disable any routing link found violating safety protocols without prior notice.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">3. Service Availability & Uptime</h2>
          <p>
            While we strive for 99.9% uptime across our global routing infrastructure, Qreative is provided on an "as is" and "as available" basis without warranties of uninterrupted availability.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">4. Intellectual Property</h2>
          <p>
            You retain ownership of the content you encode into your codes. All platform assets, algorithms, codebases, and logos remain the exclusive intellectual property of Qreative.
          </p>
        </section>
      </div>
    </div>
  )
}