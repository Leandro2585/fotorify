import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "./_components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "Fotorify",
  description: "AI-powered photo manipulator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/" appearance={{
      variables: { colorPrimary: '#272E3F' }
    }}>

    <html lang="en">
      <body
        className={cn("font-IBMPlex antialiased", inter.variable)}
      >
        <ThemeProvider 
          attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
        > 

          {children}
          <Toaster/>
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
