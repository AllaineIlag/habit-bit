'use server'

import { createServerSupabaseClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'

/**
 * Sign in a user with email and password.
 */
export async function signIn(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  
  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  const supabase = await createServerSupabaseClient()
  
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (signInError) {
    return { error: signInError.message }
  }

  // Check if the user is authorized in the profiles table
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: 'Authentication failed: User not found' }
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (profileError || !profile) {
    // If not in profiles table, they are not allowed in the system
    await supabase.auth.signOut()
    return { error: 'Access Denied: Your account is not authorized to use this system.' }
  }

  redirect('/dashboard')
}

/**
 * Sign out the current user.
 */
export async function signOut() {
  const supabase = await createServerSupabaseClient()
  await supabase.auth.signOut()
  redirect('/auth')
}
