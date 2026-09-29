import { NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const pendingUrl = searchParams.get('url');

  if (code) {
    const cookieStore = await cookies();
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) { return cookieStore.get(name)?.value; },
          set(name: string, value: string, options: CookieOptions) { cookieStore.set({ name, value, ...options }); },
          remove(name: string, options: CookieOptions) { cookieStore.delete({ name, ...options }); },
        },
      }
    );
    
    const { data: authData } = await supabase.auth.exchangeCodeForSession(code);

    if (pendingUrl && authData?.user) {
      const safeCode = Math.random().toString(36).substring(2, 8);
      await supabase.from('qr_codes').insert({
        user_id: authData.user.id,
        destination_url: pendingUrl,
        safe_scan_code: safeCode
      });
      // NEW: Tell the dashboard exactly which code to automatically pop open!
      return NextResponse.redirect(`${origin}/dashboard?newCode=${safeCode}`);
    }
  }

  return NextResponse.redirect(`${origin}/dashboard`);
}