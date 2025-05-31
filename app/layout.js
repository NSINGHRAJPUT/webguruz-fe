import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from './hooks/useAuth';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'WebGuruz - Digital Solutions',
  description: 'WebGuruz provides web development, mobile app development, and digital marketing services.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}