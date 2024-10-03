"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link'

interface User {
  email: string;
  password: string;
}


const SignIn: React.FC = () => {
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });

  const [isHovered, setIsHovered] = useState(false)

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user);
    // Aquí iría la lógica para el inicio de sesión. No terminada
    router.push(`/dashboard`);
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
              Inicia Sesión en EnviroSense
          </h2>
          <form className="space-y-4 animate-fade-in-up animation-delay-200" onSubmit={handleSubmit}>

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
                className="text-black mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
                <label
                  htmlFor="password"
                  className="block text-sm text-white font-medium"
                >
                Contraseña
                </label>
                <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                onChange={handleChange}
                required
                placeholder="Ingresa contraseña"
                className="text-black mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-8"
                />
            </div>

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
                <span className="mr-2">Iniciar sesión</span>
              </button>
            </div>
            
            <div className="flex items-center justify-center">
              <Link href="/auth/forgot-password" className="text-sm font-medium justify-center text-white-600 hover:scale-110">Olvide mi contraseña</Link>
            </div>

          </form>
        </div>

        <Link href="/home/dashboard" className="mt-20 text-sm font-medium justify-center text-white-600 hover:scale-110">
          Sesion trampa
        </Link>

        <Link href="/auth/forgot-password" className="mt-20 text-sm font-medium justify-center text-white-600 hover:scale-110">
          cambiar contra
        </Link>

      </main>

      <footer className="p-6 text-center">
        <p>&copy; 2024 EnviroSense Technologies. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default SignIn;