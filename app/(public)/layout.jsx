import "../globals.css";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  metadataBase: new URL("https://www.thrivbeats.com"),
  title: {
    default: "ThrivBeats | Personalised Exercise and Real Support",
    template: "%s | ThrivBeats",
  },
  description:
    "Personalised, clinically informed exercise support for individuals, care homes and workplaces, delivered online worldwide and on site in Scotland.",
  alternates: { canonical: "/" },
  applicationName: "ThrivBeats",
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "ThrivBeats",
    title: "Personalised Exercise. Real Support. Better Health.",
    description:
      "Personalised exercise support for individuals, care homes and workplaces.",
    url: "/",
    images: [{ url: "/og.png", width: 1733, height: 910, alt: "ThrivBeats — Personalised Exercise. Real Support. Better Health." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Personalised Exercise. Real Support. Better Health.",
    description:
      "Personalised exercise support for individuals, care homes and workplaces.",
    images: ["/og.png"],
  },
  verification: { other: { "msvalidate.01": "9EA4A86E83C869DA641D53CC13F5B901" } },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#9f1239",
};

export default function PublicLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className="min-h-screen">{children}</div>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
