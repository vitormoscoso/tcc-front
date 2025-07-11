"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

export function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-[#3A6EA5] border-b px-6 py-4 flex items-center justify-between shadow-sm">
      <Link href="/" className="text-xl font-semibold text-white">
        Clube do Livro
      </Link>

      <div className="relative w-full max-w-xs">
        <Input
          type="text"
          placeholder="Pesquisar por título ou ISBN"
          className="bg-white pr-10 text-[#3A6EA5] placeholder:text-[#3A6EA5] placeholder:font-medium selection:bg-[#3A6EA5]"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black h-4 w-4 pointer-events-none" />
      </div>

      <nav className="flex items-center gap-4">
        {user ? (
          <span className="text-sm text-muted-foreground">{user.email}</span>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button className="bg-white font-bold rounded-sm text-[#3A6EA5] hover:bg-[#e0e0e0] cursor-pointer">
                Cadastrar
              </Button>
            </Link>
            <Link href="/login">
              <Button className="bg-white font-bold rounded-sm text-[#3A6EA5] hover:bg-[#e0e0e0] cursor-pointer">
                Entrar
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
