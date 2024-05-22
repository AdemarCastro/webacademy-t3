"use client";

import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar/NavBar";
import BootstrapClient from "../../BootstrapClient";

import { usePathname } from 'next/navigation'
import { ReactQueryClientProvider } from "./components/ReactQueryClient";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showNavBar =!['/login', '/cadastro'].includes(pathname);

  return (
    <html lang="pt-BR">
      <body>
        <ReactQueryClientProvider>
          {showNavBar && <NavBar />}
          {children}
          <BootstrapClient />
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}

// Basicamente: Colar um código em todas as suas rotas
