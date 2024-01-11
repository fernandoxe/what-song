import './globals.css';

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
        <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&family=Open+Sans:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />
        <title>{process.env.NEXT_PUBLIC_SITE_TITLE}</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
