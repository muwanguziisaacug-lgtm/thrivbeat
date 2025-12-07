'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, CheckIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const Success = () => {
  const router = useRouter()

  return (
    <div className='flex justify-center mt-20'>
      <Card className='w-3/6 h-[50vh]'>
        <CardHeader className='text-center gap-5'>
          <CardTitle className='text-3xl text-red-600 font-medium flex items-center flex-col gap-4'>
            <CheckCircle className='size-10'/>
            <p>Payment Failed</p>
          </CardTitle>
          <CardDescription className='text-xl'>
            If you have issues making payment contact for support 
          </CardDescription>
        </CardHeader>
        <CardContent className='flex justify-center mt-10'>
          <Button 
            className='bg-red-600 text-white'
            onClick = {() => router.push('/exercise')}
          >
              Go Back
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default Success