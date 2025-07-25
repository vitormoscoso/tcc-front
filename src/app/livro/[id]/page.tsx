import { getBookDetails, getBookReviews } from "@/services/books/bookService";
import { BookPageClient } from "./BookPageClient";

export const dynamicParams = false;

export default async function BookPage({ params }: { params: { id: string } }) {
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
