import '../globals.css'

import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

export const metadata = {
title: "ThrivBeat",
description: `Your physical therapist for cardiac issues`,
};

export default function RootLayout({ children }) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            {children}
          <Toaster />
          </ThemeProvider>
        </body>
      </html>
    ); 
}