import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/projects", label: "Projects" },
  { href: "/settings", label: "Settings" },
];

export const metadata: Metadata = {
  title: "Project Explorer",
  description: "Project Explorer workspace for project planning and monitoring.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <header className="site-header">
          <div className="header-inner">
            <Link href="/" className="brand" aria-label="Project Explorer home">
              <span className="brand-mark">P</span>
              <span>Project Explorer</span>
            </Link>

            <nav className="main-nav" aria-label="Main navigation">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="nav-link">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main className="main-content">{children}</main>

        <footer className="site-footer">
          <p>Project Explorer workspace • Built for organized delivery.</p>
        </footer>
      </body>
    </html>
  );
}
