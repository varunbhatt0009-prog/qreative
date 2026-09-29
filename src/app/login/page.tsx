'use client'

import { Suspense, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useSearchParams } from 'next/navigation'

function LoginContent() {
  const searchParams = useSearchParams()
  const pendingUrl = searchParams.get('url')
  
  // NEW: State to toggle between Sign In and Sign Up views
  const [isLogin, setIsLogin] = useState(false)

  const handleGoogleAuth = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    
    const redirectUrl = pendingUrl 
      ? `${location.origin}/auth/callback?url=${encodeURIComponent(pendingUrl)}`
      : `${location.origin}/auth/callback`

    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: redirectUrl }
    })
  }

  return (
    <div className="w-full max-w-md bg-[#0a0a0a] border border-gray-800 rounded-3xl p-8 shadow-2xl relative z-10">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-white text-black rounded-2xl flex items-center justify-center font-bold text-4xl mx-auto mb-6 shadow-[0_0_40px_rgba(255,255,255,0.2)]">Q</div>
        <h1 className="text-2xl font-bold text-white mb-2">
          {isLogin ? 'Welcome back' : 'Create your account'}
        </h1>
        <p className="text-gray-400 text-sm">
          {isLogin ? 'Sign in to access your business hub.' : 'Start your 1-month premium trial today.'}
        </p>
      </div>

      <div className="space-y-4">
        <button 
          onClick={handleGoogleAuth}
          className="w-full bg-white text-black flex items-center justify-center gap-3 py-3.5 rounded-xl font-bold hover:bg-gray-200 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </button>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-800 text-center flex flex-col gap-4">
        <button 
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
        >
          {isLogin ? "Don't have an account? Sign up" : "Already a user? Log in"}
        </button>
        <p className="text-xs text-gray-600">
          By continuing, you agree to our Terms of Service.
        </p>
      </div>
    </div>
  )
}

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <LoginContent />
      </Suspense>
    </div>
  )
}