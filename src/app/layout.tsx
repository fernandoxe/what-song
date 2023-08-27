import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={process.env.NEXT_PUBLIC_SITE_DESCRIPTION} />
        <title>{process.env.NEXT_PUBLIC_SITE_TITLE}</title>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
