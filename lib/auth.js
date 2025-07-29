
import 'server-only';
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { emailOTP } from "better-auth/plugins"
import { resend } from "./resend";

export const auth = betterAuth({
        database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }
    },
    plugins: [
        emailOTP({
            async sendVerificationOTP({ email, otp}) { 
                await resend.emails.send({
                from: 'THRIVBEAT <onboarding@resend.dev>',
                to: [email],
                subject: 'THIRVBEAT - VERIFY YOUR EMAIL',
                html: `<p>Your OTP is <strong>${otp}</strong></p>`
    }); 
            }, 
        })
    ]
})