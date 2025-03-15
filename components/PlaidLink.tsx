import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link';
import { StyledString } from 'next/dist/build/swc';
import { useRouter } from 'next/navigation';
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.action';
const PlaidLink = ({ user, variant }: PlaidLinkProps) => {

    const router = useRouter();

    const [token, settoken] = useState('');
    
    const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
        await exchangePublicToken({
            publicToken: public_token,
            user
        })
        router.push('/');
    }, [user]);

    useEffect(() => {
        const getLinkToken = async () => {
            const data = await createLinkToken(user);

            settoken(data?.linkToken)
        }

        getLinkToken()
    }, [user]);
    
    const config: PlaidLinkOptions = {
        token,
        onSuccess
    }

    const { open, ready } = usePlaidLink(config);
  return (
    <>
        {variant === 'primary' ? (
            <Button
                onClick={() => open()}
                disabled={!ready}
                className='plaidlink-primary'
            >
                Connect Bank
            </Button>
        ) : variant === 'ghost' ? (
            <Button>
                Connect Bank
            </Button>
        ) : (
            <Button>
                Connect Bank
            </Button>
        )}
    </>
  )
}

export default PlaidLink