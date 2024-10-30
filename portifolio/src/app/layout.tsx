import "./globals.css";
import type { Metadata } from "next";
import Cabecalho from "./components/Cabecalho/Cabecalho";
import Rodape from "./components/Rodape/rodape";

export const metadata: Metadata = {
  title: "Portifolio",
  description: "dashboard de alunos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
      >
        <Cabecalho/>
        {children}
        <Rodape/>
      </body>
    </html>
  );
}
