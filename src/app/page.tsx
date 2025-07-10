import { BooksCarousel } from "@/components/BooksCarousel";

export default function HomePage() {
  return (
    <main className="p-6">
      <div className="w-full">
        <div>
          <h3 className="text-2xl font-bold mb-4 text-[#3A6EA5]">
            Best Sellers
          </h3>
          <BooksCarousel />
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-2 mt-6 text-[#3A6EA5]">
            Romance
          </h3>
          <BooksCarousel />
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-bold mb-2 text-[#3A6EA5]">
            Ficção Científica
          </h3>
          <BooksCarousel />
        </div>
      </div>
    </main>
  );
}
