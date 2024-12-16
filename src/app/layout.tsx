import { Metadata } from 'next';
import { Navigation, Footer } from '@/components/common';
import { siteConfig } from '@/config/site';
import '@/styles/globals.css';
import { fonts } from '@/config/fonts'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fonts.sans.className} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-white" suppressHydrationWarning>
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
