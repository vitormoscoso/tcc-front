"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getUserProfile } from "@/services/users/userService";
import { User } from "@/types/user";
import { BookOpen, Clock, Heart, Star, User as UserIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { id } = useParams();

  const [userProfile, setUserProfile] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile(id as string);
        setUserProfile(profile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [id]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center flex-col gap-4 mt-6">
        <Avatar className="w-16 h-16">
          <AvatarImage src={userProfile?.photoURL ?? undefined} alt="perfil" />
          <AvatarFallback>
            <UserIcon color="gray" className="w-12 h-12" />
          </AvatarFallback>
        </Avatar>
        <h1 className="text-[#3A6EA5] font-bold">{userProfile?.displayName}</h1>
        <BookOpen className="text-[#3A6EA5]" size="30px" />
      </div>

      <div className="w-[35rem] h-[20rem] flex items-center justify-center flex-col gap-4 mt-6 bg-[#3A6EA5] p-10 rounded-sm">
        <div className="bg-white text-[#3A6EA5] rounded-sm p-4 w-full h-full flex flex-col gap-2">
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() =>
              (window.location.href = `/perfil/${id as string}/lista/favoritos`)
            }
          >
            <Heart color="#3A6EA5" />
            Livros favoritos
          </div>
          <Separator className="my-2" color="#3A6EA5" />
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() =>
              (window.location.href = `/perfil/${id as string}/lista/avaliados`)
            }
          >
            <Star color="#3A6EA5" />
            Livros avaliados
          </div>
          <Separator className="my-2" color="#3A6EA5" />
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() =>
              (window.location.href = `/perfil/${id as string}/lista/para_ler`)
            }
          >
            <Clock color="#3A6EA5" />
            Livros para ler depois
          </div>
        </div>
      </div>
    </div>
  );
}
