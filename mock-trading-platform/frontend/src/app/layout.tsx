import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "arial", "sans-serif"],
  preload: true,
});

export const metadata: Metadata = {
  title: "CryptoX360VaultMarkets - Advanced Crypto & Traditional Trading Platform",
  description: "360-degree trading platform for crypto and traditional markets. Vault-grade security, institutional execution, and comprehensive market access. Trade Bitcoin, stocks, forex & more.",
  keywords: "crypto trading, bitcoin trading, cryptocurrency platform, vault security, 360 trading, institutional trading, DeFi, blockchain trading, digital assets, traditional markets",
  authors: [{ name: "CryptoX360VaultMarkets" }],
  creator: "CryptoX360VaultMarkets",
  publisher: "CryptoX360VaultMarkets",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://cryptox360vaultmarkets.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "CryptoX360VaultMarkets - 360° Trading with Vault Security",
    description: "Comprehensive trading platform covering crypto, stocks, forex, and DeFi. Bank-grade vault security meets cutting-edge trading technology.",
    url: 'https://cryptox360vaultmarkets.com',
    siteName: 'CryptoX360VaultMarkets',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CryptoX360VaultMarkets - 360° Trading Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "CryptoX360VaultMarkets - 360° Trading Platform",
    description: "Comprehensive trading platform covering crypto, stocks, forex, and DeFi. Bank-grade vault security meets cutting-edge trading technology.",
    images: ['/twitter-image.jpg'],
    creator: '@cryptox360vault',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to Google Fonts for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#1e293b" />
        <meta name="msapplication-TileColor" content="#1e293b" />
        
        {/* Additional meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              "name": "CryptoX360VaultMarkets",
              "description": "360-degree trading platform for crypto and traditional markets with vault-grade security and institutional execution",
              "url": "https://cryptox360vaultmarkets.com",
              "logo": "https://cryptox360vaultmarkets.com/logo.png",
              "sameAs": [
                "https://twitter.com/cryptox360vault",
                "https://linkedin.com/company/cryptox360vaultmarkets"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-555-VAULT-360",
                "contactType": "customer service",
                "areaServed": ["US", "EU", "Asia"],
                "availableLanguage": ["English", "Spanish", "French", "German", "Japanese"]
              },
              "serviceType": "Cryptocurrency Trading Platform",
              "currenciesAccepted": ["USD", "EUR", "BTC", "ETH"]
            })
          }}
        />
      </head>
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
