"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { signInWithPopup } from "firebase/auth";
import { Input } from "@/components/ui/input";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onOpenChange(false); // fecha o modal após login
    } catch (err) {
      console.error("Login error:", err);
      setError("Erro ao fazer login.");
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      onOpenChange(false);
    } catch (err) {
      console.error("Erro login com Google:", err);
      setError("Não foi possível entrar com o Google.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm bg-[#3A6EA5] border-none rounded-lg p-16">
        <DialogHeader>
          <DialogTitle className="text-center text-white text-lg font-bold">
            Acessar Conta
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleLogin} className="space-y-4 mt-4 w-75 mx-auto">
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
        <div className="flex justify-center">
          <Button variant="outline" onClick={handleGoogleLogin}>
            Entrar com Google
          </Button>
        </div>
        <p className="text-center text-balck text-sm mt-4">
          Não possui uma conta?{" "}
          <span
            className="cursor-pointer text-white"
            onClick={() => {
              onOpenChange(false);
              // Aqui você pode redirecionar para a página de cadastro, se necessário
            }}
          >
            Cadastre-se
          </span>
        </p>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </DialogContent>
    </Dialog>
  );
}
