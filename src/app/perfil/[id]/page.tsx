"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { BookOpen, User, Clock, Heart, Star } from "lucide-react";
import { useParams } from "next/navigation";

export default function ProfilePage() {
  const { id } = useParams();
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center flex-col gap-4 mt-6">
        <Avatar className="w-16 h-16">
          <AvatarImage src={user?.photoURL ?? undefined} alt="perfil" />
          <AvatarFallback>
            <User color="gray" className="w-12 h-12" />
          </AvatarFallback>
        </Avatar>
        <h1 className="text-[#3A6EA5] font-bold">{user?.displayName}</h1>
        <BookOpen className="text-[#3A6EA5]" size="30px" />
      </div>

      <div className="w-[35rem] h-[20rem] flex items-center justify-center flex-col gap-4 mt-6 bg-[#3A6EA5] p-10 rounded-sm">
        <div className="bg-white text-[#3A6EA5] rounded-sm p-4 w-full h-full flex flex-col gap-2">
          <div className="flex items-center gap-4 cursor-pointer">
            <Heart color="#3A6EA5" />
            Livros favoritos
          </div>
          <Separator className="my-2" color="#3A6EA5" />
          <div className="flex items-center gap-4 cursor-pointer">
            <Star color="#3A6EA5" />
            Livros avaliados
          </div>
          <Separator className="my-2" color="#3A6EA5" />
          <div className="flex items-center gap-4 cursor-pointer">
            <Clock color="#3A6EA5" />
            Livros para ler depois
          </div>
        </div>
      </div>
    </div>
  );
}
