'use client'
import { useState } from 'react'
//import { Button } from "@/components/ui/button"
import { ArrowRight, Thermometer, Droplets, Wind } from "lucide-react"
import Link from 'next/link';

export default function LandingPage() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <header className="p-6">
        <h1 className="text-2xl font-bold">EnviroSense</h1>
      </header>
      
      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-extrabold mb-6 animate-fade-in-up">
            Bienvenido a EnviroSense
          </h2>
          <p className="text-xl mb-8 animate-fade-in-up animation-delay-200">
            Monitoreo en real-time de temperatura, humedad, y niveles de CO2 en tus ambientes.
          </p>
          <div className="flex justify-center space-x-8 mb-12">
            <div className="flex flex-col items-center animate-float">
              <Thermometer size={48} className="mb-2" />
              <span>Temperatura</span>
            </div>
            <div className="flex flex-col items-center animate-float animation-delay-200">
              <Droplets size={48} className="mb-2" />
              <span>Humedad</span>
            </div>
            <div className="flex flex-col items-center animate-float animation-delay-400">
              <Wind size={48} className="mb-2" />
              <span>Nivel CO2</span>
            </div>
          </div>
        </div>
        <Link href="/auth/sign-in">
          <button
            className={`
              bg-white text-blue-600 hover:bg-blue-100 hover:text-blue-700
              transition-all duration-300 ease-in-out
              transform hover:scale-105 hover:shadow-lg
              flex items-center justify-center
              group
              px-7 py-3 text lg
              rounded-lg
            `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="mr-2">Inicia sesión para comenzar</span>
            <ArrowRight className={`
              transition-transform duration-300 ease-in-out
              ${isHovered ? 'translate-x-1' : ''}
            `} />
          </button>
        </Link>
      
      </main>
      
      <footer className="p-6 text-center">
        <p>&copy; 2024 EnviroSense Technologies. All rights reserved.</p>
      </footer>
    </div>
  )
}