import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "InventBerry - Controle de Inventário",
  description: "Aplicação para controle de inventário",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
