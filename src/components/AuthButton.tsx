"use client"
import { connectPhantom } from '@/utils'
import { FC } from 'react'
import { toast } from 'sonner'
import base58 from 'bs58';
import { setCookies } from '@/server/setCookies';

interface AuthButtonProps {
  
}

const AuthButton: FC<AuthButtonProps> = ({}) => {

    const handleClick = async () => {
        const provider = await connectPhantom()
        console.log(provider);

        // if phantom wallet not installed
        if(!provider){
            const isMobile = mobileCheck()
            if(isMobile){
                console.log("This is on a phone");
                
                return
            }

            toast.error("Phantom provider not found")
            return
        }

        // provider is connected
        const walletAddress = provider.publicKey?.toBase58();
        if(!walletAddress){
            toast.error("Failed to find wallet")
            return
        }

        const message = `By signing, you agree to Axiom's Terms of Use & Privacy Policy (axiom.trading/legal).`;
        const encodedMessage = new TextEncoder().encode(message);
        let signature;
        try {
            const signedMessage = await provider.signMessage(encodedMessage, 'utf8');
            signature = base58.encode(signedMessage.signature);
        } catch (error) {
            toast.error('Message not signed');
            return; //user refused to sign
        }

        setCookies({
            walletAddress,
            signature,        
        })
    }    

  return (
    <button
    className="bg-blue-500 rounded px-4 py-2 text-white hover:bg-blue-700 transition-colors duration-150"
    onClick={() => handleClick()}
    >
        Login
    </button>
  )
}

export default AuthButton