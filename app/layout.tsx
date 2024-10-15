import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LoginProvider } from '@/context/LoginContext'; // Import LoginProvider to manage global login state

export const metadata: Metadata = {
  title: 'Digital-Detox',
  // description: 'Digital Detox Planner',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LoginProvider> {/* Wrap everything inside the LoginProvider */}
          <Navbar /> {/* Navbar is always displayed */}
          <main className="relative overflow-hidden">
            {children} {/* This renders the page-specific content */}
          </main>
          <Footer /> {/* Footer is always displayed */}
        </LoginProvider>
      </body>
    </html>
  );
}
