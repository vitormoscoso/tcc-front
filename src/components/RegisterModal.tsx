"use client";

import { auth, googleProvider } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface RegisterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RegisterModal({
  open,
  onOpenChange,
}: RegisterModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onOpenChange(false);
    } catch (err) {
      console.error("Erro no cadastro:", err);
      setError("Não foi possível criar a conta.");
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      onOpenChange(false);
    } catch (err) {
      console.error("Erro login com Google:", err);
      setError("Erro ao entrar com Google.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm bg-[#3A6EA5] border-none rounded-lg p-16">
        <DialogHeader>
          <DialogTitle className="text-center text-white">
            Cadastre-se
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleRegister} className="space-y-3 mt-4">
          <Input
            className="bg-white placeholder:font-medium rounded-sm"
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            className="bg-white placeholder:font-medium rounded-sm"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            className="bg-white placeholder:font-medium rounded-sm"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            className="bg-white placeholder:font-medium rounded-sm"
            type="password"
            placeholder="Confirmar senha"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <div className="flex justify-center mt-4">
            <Button
              type="submit"
              className="w-fit text-white cursor-pointer hover:bg-transparent hover:text-white"
              variant={"ghost"}
            >
              Continuar
            </Button>
          </div>
        </form>

        <div>
          <Separator />
          <p className="text-center text-sm text-muted-foreground mt-2 text-white">
            ou
          </p>
        </div>

        <Button
          variant="outline"
          className="w-full cursor-pointer"
          onClick={handleGoogleSignup}
        >
          <img src="/google.png" alt="Google Icon" className="w-4 h-4 mr-2" />
          Entrar com Google
        </Button>

        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
