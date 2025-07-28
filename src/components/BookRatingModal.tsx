"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { createBookReview } from "@/services/books/bookService";
import { Star } from "lucide-react";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { addBookToList } from "@/services/lists/listService";

interface BookRatingModalProps {
  bookID: string;
  setAlertMessage: ({
    type,
    message,
  }: {
    type: "success" | "error";
    message: string;
  }) => void;
}

export function BookRatingModal({
  bookID,
  setAlertMessage,
}: BookRatingModalProps) {
  const { user } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    try {
      await createBookReview({
        uid_firebase: user?.uid || "",
        id_livro: bookID,
        nota: rating,
        comentario: comment,
      });

      await addBookToList({
        uid_firebase: user?.uid || "",
        isbn: bookID,
        tipo_lista: "avaliados",
      });

      setAlertMessage({
        type: "success",
        message: "Avaliação salva com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao salvar avaliação:", error);
      setAlertMessage({ type: "error", message: "Erro ao salvar avaliação." });
    } finally {
      setIsOpen(false);
      setRating(0);
      setComment("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-white text-[#3A6EA5] font-bold hover:bg-white/90 cursor-pointer">
          Avaliar
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Avalie este livro</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                onMouseEnter={() => setHoverRating(i + 1)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(i + 1)}
                className={`w-6 h-6 cursor-pointer transition-colors ${
                  (hoverRating || rating) > i
                    ? "text-yellow-400"
                    : "text-gray-300"
                } fill-current`}
              />
            ))}
          </div>

          <Textarea
            placeholder="Deixe um comentário (opcional)"
            value={comment}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setComment(e.target.value)
            }
          />
        </div>

        <DialogFooter className="mt-4">
          <Button
            variant="ghost"
            onClick={() => setIsOpen(false)}
            className="cursor-pointer"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="bg-[#3A6EA5] text-white hover:bg-[#2a5a8b] cursor-pointer"
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
