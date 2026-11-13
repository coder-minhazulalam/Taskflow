import "./globals.css";

export const metadata = {
  title: "TaskFlow - Modern Project & Task Management",
  description: "Organize, track, and manage your team projects with TaskFlow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
