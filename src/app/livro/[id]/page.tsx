import { getBookDetails , getBookReviews} from "@/services/books/bookService";

interface PageProps {
  params: { id: string };
}

export default async function BookPage({ params }: PageProps) {
//   const bookDetails = await getBookDetails(params.id);
//   const bookReviews = await getBookReviews(params.id)
  

  return (
    <div className="p-12">
        <div className="p-4 bg-[#3A6EA5] flex gap-6"></div>
            
    </div>
  );
}
