/* eslint-disable @typescript-eslint/no-explicit-any */
import { PublicKey, Transaction, VersionedTransaction, type SendOptions } from '@solana/web3.js';

type DisplayEncoding = 'utf8' | 'hex';

type PhantomEvent = 'connect' | 'disconnect' | 'accountChanged';

type PhantomRequestMethod =
  | 'connect'
  | 'disconnect'
  | 'signAndSendTransaction'
  | 'signAndSendTransactionV0'
  | 'signAndSendTransactionV0WithLookupTable'
  | 'signTransaction'
  | 'signAllTransactions'
  | 'signMessage';

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

export interface PhantomProvider {
  publicKey: PublicKey | null;
  isConnected: boolean | null;
  signAndSendTransaction: (transaction: Transaction | VersionedTransaction, opts?: SendOptions) => Promise<{ signature: string; publicKey: PublicKey }>;
  signTransaction: (transaction: Transaction | VersionedTransaction) => Promise<Transaction | VersionedTransaction>;
  signAllTransactions: (transactions: (Transaction | VersionedTransaction)[]) => Promise<(Transaction | VersionedTransaction)[]>;
  signMessage: (message: Uint8Array | string, display?: DisplayEncoding) => Promise<any>;
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, handler: (args: any) => void) => void;
  request: (method: PhantomRequestMethod, params: any) => Promise<unknown>;
  isPhantom: boolean;
}

/**
 * connects phantom
 * @returns {PhantomProvider | undefined} a Phantom provider if one exists in the window
 */
export const connectPhantom = async (): Promise<PhantomProvider | null> => {
  if ('phantom' in window) {
    // Opens wallet to connect to
    const anyWindow: any = window;
    const provider = anyWindow.phantom?.solana;
    if (provider?.isPhantom) {
      try {
        await provider.connect();
        return provider;
      } catch (e) {
        /* empty */
      }
    }
  }
  return null;
};

export const getPhantomWallet = async (): Promise<PublicKey | null> => {
  const provider = await connectPhantom();
  if (provider) {
    return provider.publicKey;
  }
  return null;
};

export const isPhantomInstalled = (): boolean => {
  const anyWindow: any = window;
  return 'phantom' in window && anyWindow.phantom?.solana?.isPhantom;
};
