import Link from 'next/link'
import { ArrowLeft, ShieldCheck } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans p-6 sm:p-12 max-w-4xl mx-auto">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft size={16} /> Back to Qreative
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <ShieldCheck className="text-emerald-400" size={32} />
        <h1 className="text-3xl font-extrabold text-white">Privacy Policy</h1>
      </div>
      <p className="text-sm text-gray-500 mb-8">Last Updated: October 2026</p>

      <div className="space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-white mb-2">1. Information We Collect</h2>
          <p>
            Qreative collects basic account information when you sign in via Google Authentication, including your name, email address, and profile photo. We also store metadata regarding generated QR codes, destination URLs, and click analytics.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">2. How We Use Information</h2>
          <p>
            Your information is used solely to maintain your active account, deliver real-time redirection and click analytics for your links, and optimize service delivery. We do not sell your personal data.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">3. Advertising & Cookies</h2>
          <p>
            We may partner with third-party advertising networks (such as Google AdSense) to display ads when you visit our website. These companies may use cookies to serve ads based on your prior visits to our website or other sites on the internet.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">4. Data Security</h2>
          <p>
            We implement industry-standard encryption and database safeguards to protect your personal information and stored routing records against unauthorized access.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">5. Contact Us</h2>
          <p>
            If you have questions regarding this privacy policy or wish to delete your account data, please reach out via our support channel.
          </p>
        </section>
      </div>
    </div>
  )
}