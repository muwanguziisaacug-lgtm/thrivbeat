'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { authClient } from '@/lib/auth-client'
import { Loader2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState, useTransition, Suspense } from 'react'
import { toast } from 'sonner'

// Force dynamic rendering to prevent prerendering issues with useSearchParams
export const dynamic = 'force-dynamic'

const VerifyRequestContent = () => {
    const [otp, setOTP] = useState()
    const [emailTransition, startEmailTransition] = useTransition();
    const params = useSearchParams()
    const email = params.get('email')
    const isOTPComplete = otp && otp.length === 6;
    const router = useRouter()
    function verifyOTP() {
        startEmailTransition( async () => {
            await authClient.signIn.emailOtp({
                email: email,
                otp: otp,
                fetchOptions: {
                    onSuccess: () => {
                        toast.success('OTP Verified redirecting...........')
                        router.push('/dashboard')

                    },
                    onError: () => {
                        toast.error('Faild to verify OTP, try again')
                    }
                }
            })
        })
    }
  return (
    <main className='w-screen h-screen grid place-content-center'>
        <Card className='w-3/5 mx-auto text-center p-4'>
            <CardTitle>Please check your email</CardTitle>
            <CardDescription>
                We have sent a verification email code to your email address. Please open the email and paste the code below
            </CardDescription>
            <CardContent>
                <div className='flex flex-col justify-center items-center gap-3'>
                    <InputOTP 
                        className='gap-2 ' 
                        maxLength={6} 
                        value={otp} 
                        onChange={(value) => setOTP(value)}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0}/>
                            <InputOTPSlot index={1}/>
                            <InputOTPSlot index={2}/>
                        </InputOTPGroup>
                        <InputOTPGroup>
                            <InputOTPSlot index={3}/>
                            <InputOTPSlot index={4}/>
                            <InputOTPSlot index={5}/>
                        </InputOTPGroup>
                    </InputOTP>
                    <p className='text-muted-foreground text-sm'>Enter the 6-digit code sent to your email</p>
                    <Button 
                        className='w-full'
                        disabled ={emailTransition || !isOTPComplete}
                        onClick={verifyOTP}
                    >
                        {emailTransition ? (
                            <>
                                <Loader2 className='size-4 animate-spin' />
                                <span>Verifying.............</span>
                            </>
                        ): (
                            <span>Verify OTP</span>
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    </main>
  )
}

const VerifyRequest = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyRequestContent />
    </Suspense>
  )
}

export default VerifyRequest