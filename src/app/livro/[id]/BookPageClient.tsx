"use client";

import { BookRatingModal } from "@/components/BookRatingModal";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { addBookToList } from "@/services/lists/listService";
import { CircleUser, Clock, Heart, Star } from "lucide-react";

interface Props {
  bookDetails: any;
  bookReviews: any[];
  bookID: string;
}

export function BookPageClient({ bookDetails, bookReviews, bookID }: Props) {
  const { user } = useAuth();

  const addToList = async (list_type: string) => {
    try {
      await addBookToList({
        uid_firebase: user?.uid || "",
        isbn: bookID,
        tipo_lista: list_type,
      });
    } catch (error) {
      console.error("Error adding book to list:", error);
    }
  };

  return (
    <div className="p-10 space-y-6">
      <div className="bg-[#3A6EA5] text-white rounded-lg p-6 flex flex-col md:flex-row gap-6 items-start">
        <img
          src={bookDetails.coverUrl}
          alt={bookDetails.title}
          className="w-[140px] h-auto rounded shadow-md"
        />

        <div className="flex-1 space-y-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl font-bold">{bookDetails.title}</h1>
              <h2 className="text-md">
                {bookDetails.authors?.length > 0
                  ? bookDetails.authors.map((a: any) => a.name).join(", ")
                  : "-"}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => addToList("favoritos")}
              >
                <Heart size={"40px"} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => addToList("para_ler")}
              >
                <Clock className="w-5 h-5" />
              </Button>
              <BookRatingModal bookID={bookID} />
            </div>
          </div>

          <p className="text-sm md:text-base leading-relaxed">
            {bookDetails.description || "-"}
          </p>

          <div className="flex gap-6 flex-wrap items-center text-sm font-semibold mt-2">
            <p>{bookDetails.publishDate || "----"}</p>
            <p>{bookDetails.numberOfPages || "?"} páginas</p>
          </div>
        </div>
      </div>

      <div className="bg-[#3A6EA5] rounded-md p-4 text-white space-y-4">
        {bookReviews.length === 0 && (
          <p className="text-sm text-white/70 text-center">
            Nenhum comentário ainda.
          </p>
        )}
        {bookReviews.map((review: any, idx: number) => (
          <div key={idx} className="flex gap-4">
            <div className="flex flex-row items-center gap-3 w-1/8">
              {review.autor.photoURL ? (
                <img
                  src={review.autor.photoURL}
                  alt={review.autor.displayName}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <CircleUser size={40} />
              )}
              <div>
                <p className="text-sm font-semibold">
                  {review.autor.displayName}
                </p>
                <div className="flex gap-0.5 mt-1">
                  {Array.from({ length: review.nota }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-white fill-current" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-sm">{review.comentario}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
