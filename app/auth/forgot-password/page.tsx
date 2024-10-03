"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link'

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false)

  const router = useRouter();

  const sendCode = async () => {
    try {
      // Aquí iría la lógica para enviar el código de recuperación de contraseña.
      router.push(`/auth/change-password?email=${email}`);
    } catch (error) {
      console.log("error sending code", error);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendCode();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <header className="p-6">
        <h1 className="text-2xl font-bold">
          <Link href="/" className="hover:text-gray-700">EnviroSense</Link>
        </h1>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center-up mt-8 px-4">
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center animate-fade-in-up">
            Forgot Your Password?
          </h2>

          <p className="text-center mb-6 animate-fade-in-up animation-delay-200">
            Ingresa tu correo electrónico y te enviaremos las instrucciones de como cambiar tu contraseña
          </p>

          <form className="space-y-4 animate-fade-in-up animation-delay-400" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-white font-medium"
              >
                Correo electrónico
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                onChange={handleChange}
                required
                placeholder="Ingresa correo electrónico"
                className="text-black mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-6"
              />

              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className={`
                    bg-white text-blue-600 hover:bg-blue-100 hover:text-blue-700 
                    transition-all duration-300 ease-in-out transform hover:scale-105 
                    hover:shadow-lg flex items-center justify-center 
                    group px-20 py-2 text lg rounded-lg
                  `}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <span className="mr-2">Cambiar Contraseña</span>
                </button>
              </div>

              <p className="mt-4 text-center text-sm text-white">
                Back to{" "}
                <Link href="/auth/sign-in" className="font-bold leading-6 hover:text-gray-700">Sign in</Link>
              </p>

            </div>
          </form>
        </div>
      </main>

      <footer className="p-6 text-center">
          <p>&copy; 2024 EnviroSense Technologies. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default ForgotPassword;