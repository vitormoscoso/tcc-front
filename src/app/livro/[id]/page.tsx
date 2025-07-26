"use client";

import { getBookDetails, getBookReviews } from "@/services/books/bookService";
import { BookDetails, BookReview } from "@/types/book";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BookPageClient } from "./BookPageClient";

export default function BookPage() {
  const { id } = useParams();

  const [bookDetails, setBookDetails] = useState<BookDetails | null>(null);
  const [bookReviews, setBookReviews] = useState<BookReview[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const details = await getBookDetails(id as string);
        const reviews = await getBookReviews(id as string);
        setBookDetails(details);
        setBookReviews(reviews);
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <BookPageClient
      bookDetails={bookDetails}
      bookReviews={bookReviews}
      bookID={id as string}
    />
  );
}
