import { Metadata, Viewport } from 'next';
import { Navigation, Footer } from '@/components/common';
import { ErrorBoundaryProvider } from '@/components/providers/ErrorBoundaryProvider';
import { siteConfig } from '@/config/site';
import '@/styles/globals.css';
import { fonts } from '@/config/fonts';
import { ClientProviders } from '@/components/providers/ClientProviders';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fonts.sans.className} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-white" suppressHydrationWarning>
        <ClientProviders>
          <Navigation />
          <main className="flex-grow mt-20">
            <ErrorBoundaryProvider>
              {children}
            </ErrorBoundaryProvider>
          </main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
