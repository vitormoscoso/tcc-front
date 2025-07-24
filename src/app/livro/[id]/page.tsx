import { getBookDetails, getBookReviews } from "@/services/books/bookService";
import { BookPageClient } from "./BookPageClient";

interface PageProps {
  params: { id: string };
}

export default async function BookPage({ params }: PageProps) {
  const { id } = await params;
  const bookDetails = await getBookDetails(id);
  const bookReviews = await getBookReviews(id);

  return (
    <BookPageClient
      bookDetails={bookDetails}
      bookReviews={bookReviews}
      bookID={id}
    />
  );
}
