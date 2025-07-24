"use client";

import { BookRatingModal } from "@/components/BookRatingModal";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  addBookToList,
  checkIfBookIsInList,
  removeBookFromList,
} from "@/services/lists/listService";
import { BookAuthor, BookDetails, BookReview } from "@/types/book";
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  CircleUser,
  Clock,
  Heart,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  bookDetails: BookDetails;
  bookReviews: BookReview[];
  bookID: string;
}

export function BookPageClient({ bookDetails, bookReviews, bookID }: Props) {
  const { user } = useAuth();
  const [isBookInFavorites, setIsBookInFavorites] = useState(false);
  const [isBookInToRead, setIsBookInToRead] = useState(false);
  const [alertMessage, setAlertMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    const checkBookInList = async () => {
      if (user) {
        const isInList = await checkIfBookIsInList(user.uid, bookID);
        setIsBookInFavorites(isInList.favourites);
        setIsBookInToRead(isInList.to_read);
      }
    };
    checkBookInList();
  }, [user, bookID]);

  const addToList = async (list_type: string) => {
    try {
      await addBookToList({
        uid_firebase: user?.uid || "",
        isbn: bookID,
        tipo_lista: list_type,
      });

      setAlertMessage({
        type: "success",
        message: "Livro adicionado à lista com sucesso!",
      });

      if (list_type === "favoritos") {
        setIsBookInFavorites(true);
      } else if (list_type === "para_ler") {
        setIsBookInToRead(true);
      }
    } catch (error) {
      console.error("Error adding book to list:", error);
      setAlertMessage({
        type: "error",
        message: "Erro ao adicionar livro à lista.",
      });
    }
    // Esconde o alerta após 3 segundos
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000);
  };

  const removeFromList = async (list_type: string) => {
    try {
      await removeBookFromList(user?.uid || "", bookID, list_type);

      setAlertMessage({
        type: "success",
        message: "Livro removido da lista com sucesso!",
      });

      if (list_type === "favoritos") {
        setIsBookInFavorites(false);
      } else if (list_type === "para_ler") {
        setIsBookInToRead(false);
      }
    } catch (error) {
      console.error("Error removing book from list:", error);
      setAlertMessage({
        type: "error",
        message: "Erro ao remover livro da lista.",
      });
    }
    // Esconde o alerta após 3 segundos
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000);
  };

  return (
    <div className="p-10 space-y-6">
      {/* ALERTA */}
      {alertMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
          <Alert
            variant={alertMessage.type === "error" ? "destructive" : "default"}
            className={`${
              alertMessage.type === "error"
                ? "border-red-600"
                : "border-green-600"
            } border-2 border-solid bg-white/10`}
          >
            {alertMessage.type === "success" ? (
              <CheckCircle2Icon color="green" />
            ) : (
              <AlertCircleIcon color="red" />
            )}

            <AlertTitle
              className={`font-semibold ${
                alertMessage.type === "error"
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {alertMessage.type === "error" ? "Erro" : "Sucesso"}
            </AlertTitle>
            <AlertDescription
              className={`${
                alertMessage.type === "error"
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {alertMessage.message}
            </AlertDescription>
          </Alert>
        </div>
      )}

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
                  ? bookDetails.authors
                      .map((a: BookAuthor) => a.name)
                      .join(", ")
                  : "-"}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (isBookInFavorites) {
                    removeFromList("favoritos");
                  } else {
                    addToList("favoritos");
                  }
                }}
                className={`${
                  isBookInFavorites ? "bg-white text-[#3A6EA5]" : ""
                } cursor-pointer`}
              >
                <Heart size={"40px"} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (isBookInToRead) {
                    removeFromList("para_ler");
                  } else {
                    addToList("para_ler");
                  }
                }}
                className={`${
                  isBookInToRead ? "bg-white text-[#3A6EA5]" : ""
                } cursor-pointer`}
              >
                <Clock size={"40px"} />
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
        {bookReviews.map((review: BookReview, idx: number) => (
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
