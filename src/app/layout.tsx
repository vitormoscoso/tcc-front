import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My App",
  description: "Frontend usando NextJS, Firebase e Tailwind",
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
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
