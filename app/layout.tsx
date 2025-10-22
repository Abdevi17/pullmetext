// Import global styles from the app directory. Use a relative path starting with './' because this
// file lives in the same directory as globals.css. Without './' Next.js tries to resolve from the
// project root, causing a module resolution error.
import './globals.css';
import type { ReactNode } from 'react';

// Metadata for the app
export const metadata = {
  title: 'PullMeText – Humanize AI',
  description: 'Turn AI-generated text into human-sounding language.',
};

// Root layout wraps all pages. Adjust body classes here for global styling.
export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}