

import "./globals.css";
import {GGSans} from "@/public/fonts/fonts";
import React from 'react';




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <head>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
          <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap"
                rel="stylesheet"/>
          <link rel="icon" type="image/x-icon" href="/icons/favicon.ico"/>
          <title>App</title>
      </head>
      <body className={`${GGSans.className} bg-primary text-primary-text`}>{children}</body>
      </html>
  );
}
