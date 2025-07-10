import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function BooksCarousel() {
  return (
    <div className="relative w-full overflow-hidden">
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem key={index} className="basis-1/4 flex justify-center">
              <div className="inline-block p-1 bg-[#3A6EA5]">
                <img
                  src={`https://covers.openlibrary.org/b/id/14935910-L.jpg`}
                  alt={`Book ${index + 1}`}
                  className="max-h-[250px] object-contain"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 bg-[#3A6EA5] text-white cursor-pointer" />
        <CarouselNext className="right-2 bg-[#3A6EA5] text-white cursor-pointer" />
      </Carousel>
    </div>
  );
}
