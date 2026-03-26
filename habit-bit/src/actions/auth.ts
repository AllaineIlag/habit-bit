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
    throw new Error('Email and password are required')
  }

  const supabase = await createServerSupabaseClient()
  
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (signInError) {
    throw signInError
  }

  // Check if the user is authorized in the profiles table
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('Authentication failed: User not found')
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (profileError || !profile) {
    // If not in profiles table, they are not allowed in the system
    await supabase.auth.signOut()
    throw new Error('Access Denied: Your account is not authorized to use this system.')
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
