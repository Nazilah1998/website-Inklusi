'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export async function loginAction(formData) {
  const email = formData.get('email');
  const password = formData.get('password');
  const turnstileToken = formData.get('turnstileToken');

  if (!turnstileToken) {
    return { error: 'Verifikasi keamanan diperlukan' };
  }

  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (secretKey) {
    try {
      const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(turnstileToken)}`,
      });
      const data = await res.json();
      if (!data.success) {
        return { error: 'Verifikasi keamanan gagal. Silakan coba lagi.' };
      }
    } catch (err) {
      return { error: 'Terjadi kesalahan sistem saat memverifikasi keamanan.' };
    }
  }

  // Supabase Authentication
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  console.log('Supabase Auth Attempt:', { 
    email, 
    authDataUser: !!authData?.user, 
    authError: authError?.message || authError 
  });

  if (authError || !authData.user) {
    console.error('Auth Error:', authError);
    return { error: authError ? authError.message : 'Email atau password salah' };
  }

  const rememberMe = formData.get('rememberMe') === 'on';
  
  // Set session cookie
  const cookieOptions = { httpOnly: true, secure: true, path: '/' };
  if (rememberMe) {
    cookieOptions.maxAge = 60 * 60 * 24 * 30; // 30 days
  }
  
  (await cookies()).set('admin_session', 'true', cookieOptions);
  redirect('/admin/dashboard');
}

export async function logoutAction() {
  (await cookies()).delete('admin_session');
  redirect('/admin/login');
}
