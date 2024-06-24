'use server'
 
import { cookies } from 'next/headers'
 
export async function setCookies({ walletAddress, signature}: { walletAddress: string, signature: string }) {
  cookies().set({
    name: "walletAddress",
    value: walletAddress,
    httpOnly: true,
    path: '/',
  })
  cookies().set({
    name: "signature",
    value: signature,
    httpOnly: true,
    path: '/',
  })
}