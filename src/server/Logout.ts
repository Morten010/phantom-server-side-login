'use server'
 
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
 
export async function logout() {

    // Delete cookies
    cookies().delete('walletAddress')
    cookies().delete('signature')
    
    // redirect to homepage
    redirect("/")
}