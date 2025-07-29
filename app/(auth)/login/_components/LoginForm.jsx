'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { GithubIcon, GraduationCap, Loader2, Mail } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';

export default function LoginForm() {
  // const [formData, setFormData] = useState({ email: '' });
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const [githubPending, startGithubTransition] = useTransition();
  const [emailTransition, startEmailTransition] = useTransition();
  const router = useRouter();

  function SignInWithEmail() {
    startEmailTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email: email,
        type: 'sign-in',
        fetchOptions: {
          onSuccess: () => {
            toast.success('Email Sent with an OTP verification');
            router.push(`/login/verify-request?email=${email}`);
          },
          onError: () => {
            toast.error('Failed to send Email OTP');
          },
        },
      });
    });
  }

  async function signWithGitHub() {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/dashboard',
        fetchOptions: {
          onSuccess: () => {
            toast.success('Signed In with Google you will be redirected');
          },
          onError: () => {
            toast.error('Internal Server Error');
          },
        },
      });
    });
  }

  // const handleInputChange = (e) => {
  //   setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-teal to-brand-teal-light rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
              <CardDescription>Enter your email to sign in</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={SignInWithEmail} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <Button 
                  disabled={emailTransition} 
                  className="w-full"
                  onClick={SignInWithEmail}
                >
                  {emailTransition ? (
                    <>
                      <Loader2 className='size-4 animate-spin'/>
                      <span>Processing.............</span>
                    </>
                  ) : (
                    <span>Continue with your email</span>
                  )}
                </Button>
              </form>

              <div className="relative py-4">
                <Separator />

                <Button
                  className="w-full"
                  disabled={githubPending}
                  variant="outline"
                  onClick={signWithGitHub}
                >
                  {githubPending ? (
                    <>
                      <Loader2 className="size-4 animate-spin " />
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <GithubIcon className="size-4" />
                      Continue with Google
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
