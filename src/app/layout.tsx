import './globals.css';
import { Open_Sans, Indie_Flower } from 'next/font/google';

const openSans = Open_Sans({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-open-sans',
});

const indieFlower = Indie_Flower({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-indie-flower',
});

const GTM = process.env.NEXT_PUBLIC_SITE_GTM || '';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <head>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GTM}`}></script>
        <script
          dangerouslySetInnerHTML={{
            __html:`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
    
              gtag('config', '${GTM}');  
            `,
          }}
        ></script>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta name="description" content={process.env.NEXT_PUBLIC_SITE_DESCRIPTION} />
        <meta property="og:title" content={process.env.NEXT_PUBLIC_SITE_TITLE} />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_URL} />
        <meta property="og:description" content={process.env.NEXT_PUBLIC_SITE_DESCRIPTION} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/og-image-192x192.png`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#7e22ce" />
        <meta name="msapplication-TileColor" content="#7e22ce" />
        <meta name="theme-color" content="#7e22ce" />
        
        <title>{process.env.NEXT_PUBLIC_SITE_TITLE}</title>
      </head>
      <body className={`${openSans.variable} ${indieFlower.variable}`}>{children}</body>
    </html>
  );
}
