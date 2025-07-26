import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Clube do Livro",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={cn(inter.className, "bg-gray-50 min-h-screen")}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
