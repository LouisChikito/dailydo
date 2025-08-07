// src/app/login/page.tsx
'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      router.push('/')
    }
  }, [router, supabase.auth])


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '320px' }}>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={['google', 'github']} // Opcional: añade más proveedores
          redirectTo="http://localhost:3000/auth/callback"
        />
      </div>
    </div>
  )
}