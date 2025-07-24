import { getBookDetails, getBookReviews } from "@/services/books/bookService";
import { BookPageClient } from "./BookPageClient";

interface PageProps {
  params: { id: string };
}

export default async function BookPage({ params }: PageProps) {
  const bookDetails = await getBookDetails(params.id);
  const bookReviews = await getBookReviews(params.id);

  return (
    <BookPageClient
      bookDetails={bookDetails}
      bookReviews={bookReviews}
      bookID={params.id}
    />
  );
}
