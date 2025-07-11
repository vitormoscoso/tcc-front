import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Book } from "@/types/book";

interface BooksCarouselProps {
  books: Array<Book>;
}

export function BooksCarousel({ books }: BooksCarouselProps) {
  return (
    <div className="relative w-full overflow-hidden">
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {books.map((book) => (
            <CarouselItem
              key={book.id}
              className="basis-1/4 flex justify-center"
            >
              <div className="inline-block p-1 bg-[#3A6EA5]">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="max-h-[250px] object-contain"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 bg-[#3A6EA5] text-white hover:bg-[#2e5884] hover:text-white cursor-pointer" />
        <CarouselNext className="right-2 bg-[#3A6EA5] text-white hover:bg-[#2e5884] hover:text-white cursor-pointer" />
      </Carousel>
    </div>
  );
}
