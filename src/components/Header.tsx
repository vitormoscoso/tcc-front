"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { searchBooks } from "@/services/books/bookService";
import { Book } from "@/types/book";
import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import LoginModal from "./LoginModal";
import { Input } from "./ui/input";

export function Header() {
  const { user } = useAuth();

  const [openLogin, setOpenLogin] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  // Fechar ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fechar ao pressionar ESC
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowResults(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      setLoading(true);
      try {
        const res = await searchBooks(query);
        setResults(res);
        setShowResults(true);
      } catch (err) {
        console.error(err);
        setResults([]);
        setShowResults(false);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSelect = (book: Book) => {
    console.log("Selecionado:", book);
    // Exemplo: navegar, setar no contexto, abrir modal, etc.
  };

  return (
    <header className="bg-[#3A6EA5] border-b px-6 py-4 flex items-center justify-between shadow-sm">
      <Link href="/" className="text-xl font-semibold text-white">
        Clube do Livro
      </Link>

      <div className="relative w-full max-w-xs" ref={wrapperRef}>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Pesquisar por título ou ISBN"
          className="bg-white pr-10 text-[#3A6EA5] placeholder:text-[#3A6EA5] placeholder:font-medium selection:bg-[#3A6EA5]"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black h-4 w-4 pointer-events-none" />

        {showResults && (
          <div className="absolute top-full mt-2 w-full bg-white shadow-lg border rounded-md z-50 max-h-96 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-sm text-gray-500">Carregando...</div>
            ) : results.length > 0 ? (
              results.map((book) => (
                <div
                  key={book.id}
                  onClick={() => handleSelect(book)}
                  className="cursor-pointer flex gap-4 p-4 hover:bg-blue-50 transition-colors"
                >
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-16 h-24 object-cover rounded shadow"
                  />
                  <div className="flex flex-col justify-center">
                    <p className="font-semibold text-base text-gray-800">
                      {book.title}
                    </p>
                    <p className="text-sm text-gray-500">{book.author}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-sm text-gray-500">
                Nenhum resultado encontrado.
              </div>
            )}
          </div>
        )}
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
            <Button
              className="bg-white font-bold rounded-sm text-[#3A6EA5] hover:bg-[#e0e0e0] cursor-pointer"
              onClick={() => setOpenLogin(true)}
            >
              Entrar
            </Button>
            <LoginModal open={openLogin} onOpenChange={setOpenLogin} />
          </div>
        )}
      </nav>
    </header>
  );
}
