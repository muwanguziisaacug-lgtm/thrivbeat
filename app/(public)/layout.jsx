import "../globals.css";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: {
    default: "ThrivBeats",
    template: "%s - Thrivbeats",
  },
  description: `Your physical therapist for cardiac issues`,
};

<head>
  <meta name="msvalidate.01" content="9EA4A86E83C869DA641D53CC13F5B901" />
  <meta name="apple-mobile-web-app-title" content="" />
  <meta name="msvalidate.01" content="9EA4A86E83C869DA641D53CC13F5B901" />
</head>;

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
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
