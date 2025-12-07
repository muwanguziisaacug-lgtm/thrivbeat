import '../globals.css'
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import Header from '../(public)/_components/Header';
import Footer from '../(public)/_components/Footer';

export const metadata = {
title: "ThrivBeat",
description: `Your physical therapist for cardiac issues`,
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Header />
                    <main className='min-h-screen'>{children}</main>
                    <Footer />
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    ); 
}