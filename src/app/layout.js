"use client"

import './globals.css'
import { QueryClientProvider } from 'react-query';
import { queryClient } from '../services/queryClient';
import { Poppins } from 'next/font/google'

const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous"/>
      </head>
      <body className={poppins.className}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>

        <script src="https://kit.fontawesome.com/4f4eb8e271.js" crossorigin="anonymous"></script>
      </body>
    </html>
  )
}
