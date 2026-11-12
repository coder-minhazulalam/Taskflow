import "@heroui/react/styles";
import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "TaskFlow - Task & Project Management System",
  description: "Full-Stack Task Management Platform built with Next.js, Express.js, Better Auth & Supabase",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
