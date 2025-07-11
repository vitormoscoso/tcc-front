"use client";

import { BooksCarousel } from "@/components/BooksCarousel";
import { getBooksByCategory } from "@/services/books/bookService";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [bestSellerBooks, setBestSellerBooks] = useState([]);
  const [scifiBooks, setScifiBooks] = useState([]);
  const [romanceBooks, setRomanceBooks] = useState([]);

  useEffect(() => {
    getBooksByCategory("bestseller")
      .then(setBestSellerBooks)
      .catch((err) => console.error("Erro ao buscar best sellers:", err));
  }, []);

  useEffect(() => {
    getBooksByCategory("science_fiction")
      .then(setScifiBooks)
      .catch((err) => console.error("Erro ao buscar ficção:", err));
  }, []);

  useEffect(() => {
    getBooksByCategory("romance")
      .then(setRomanceBooks)
      .catch((err) => console.error("Erro ao buscar romance:", err));
  }, []);

  return (
    <main className="p-6">
      <div className="w-full">
        <div>
          <h3 className="text-2xl font-bold mb-4 text-[#3A6EA5]">
            Best Sellers
          </h3>
          <BooksCarousel books={bestSellerBooks}/>
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-bold mb-2 text-[#3A6EA5]">
            Ficção Científica
          </h3>
          <BooksCarousel books={scifiBooks}/>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-2 mt-6 text-[#3A6EA5]">
            Romance
          </h3>
          <BooksCarousel books={romanceBooks}/>
        </div>
      </div>
    </main>
  );
}
