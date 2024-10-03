'use client'

import React, { useState } from 'react'
import { LayoutDashboard, Search, Settings, LogOut, Thermometer, Droplets, Wind } from "lucide-react"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
//import { useToast } from "@/components/ui/use-toast"

// Expanded test data
const classData = [
  { id: 1, name: 'Room 101', temperature: 35, humidity: 45, co2: 800 },
  { id: 2, name: 'Room 102', temperature: 23.1, humidity: 48, co2: 750 },
  { id: 3, name: 'Room 103', temperature: 21.8, humidity: 42, co2: 820 },
  { id: 4, name: 'Room 104', temperature: 24.2, humidity: 50, co2: 780 },
  { id: 5, name: 'Room 105', temperature: 22.7, humidity: 46, co2: 810 },
  { id: 6, name: 'Room 106', temperature: 23.5, humidity: 47, co2: 790 },
  { id: 7, name: 'Room 107', temperature: 22.0, humidity: 44, co2: 830 },
  { id: 8, name: 'Room 108', temperature: 24.5, humidity: 51, co2: 770 },
  { id: 9, name: 'Room 201', temperature: 23.2, humidity: 49, co2: 795 },
  { id: 10, name: 'Room 202', temperature: 22.9, humidity: 47, co2: 805 },
  { id: 11, name: 'Room 203', temperature: 23.7, humidity: 52, co2: 760 },
  { id: 12, name: 'Room 204', temperature: 21.5, humidity: 43, co2: 840 },
  { id: 13, name: 'Room 205', temperature: 24.0, humidity: 48, co2: 785 },
  { id: 14, name: 'Room 206', temperature: 22.3, humidity: 45, co2: 815 },
  { id: 15, name: 'Room 207', temperature: 23.9, humidity: 50, co2: 775 },
  { id: 16, name: 'Room 208', temperature: 22.6, humidity: 46, co2: 825 },
  { id: 17, name: 'Room 301', temperature: 23.3, humidity: 49, co2: 790 },
  { id: 18, name: 'Room 302', temperature: 22.8, humidity: 47, co2: 810 },
  { id: 19, name: 'Room 303', temperature: 24.1, humidity: 51, co2: 765 },
  { id: 20, name: 'Room 304', temperature: 21.7, humidity: 44, co2: 835 },
  { id: 21, name: 'Room 305', temperature: 23.6, humidity: 48, co2: 795 },
  { id: 22, name: 'Room 306', temperature: 22.4, humidity: 45, co2: 820 },
  { id: 23, name: 'Room 307', temperature: 24.3, humidity: 50, co2: 780 },
  { id: 24, name: 'Room 308', temperature: 23.0, humidity: 47, co2: 805 },
  { id: 25, name: 'Room 401', temperature: 22.8, humidity: 46, co2: 815 },
  { id: 26, name: 'Room 402', temperature: 23.4, humidity: 49, co2: 785 },
  { id: 27, name: 'Room 403', temperature: 24.2, humidity: 51, co2: 770 },
  { id: 28, name: 'Room 404', temperature: 21.9, humidity: 44, co2: 830 },
  { id: 29, name: 'Room 405', temperature: 23.8, humidity: 50, co2: 790 },
  { id: 30, name: 'Room 406', temperature: 22.5, humidity: 45, co2: 810 },
]

export default function HomePage() {
  const [activeRoom, setActiveRoom] = useState(0)
  // const { toast } = useToast()

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight } = event.currentTarget
    const roomHeight = 200 // Approximate height of each room card
    const newActiveRoom = Math.floor(scrollTop / roomHeight)
    setActiveRoom(newActiveRoom)
  }

  const scrollToRoom = (index: number) => {
    const scrollContainer = document.getElementById('room-scroll-container')
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: index * 200,
        behavior: 'smooth'
      })
    }
  }

  const handleAlertClick = (room: typeof classData[0]) => {
    // toast({
    //   title: `Alert for ${room.name}`,
    //   description: `Temperature: ${room.temperature}°C, Humidity: ${room.humidity}%, CO2: ${room.co2} ppm`,
    // })
  }

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-blue-800 p-6 space-y-4">
        <h1 className="text-2xl font-bold mb-8">EnviroSense</h1>
        <nav className="space-y-2">
          <NavLink href="/home/dashboard" icon={<LayoutDashboard size={24} />}>Dashboard</NavLink>
          <NavLink href="/home/queries" icon={<Search size={24} />}>Queries</NavLink>
          <NavLink href="/home/config" icon={<Settings size={24} />}>Config</NavLink>
        </nav>
        <div className="pt-8">
          <Button variant="ghost" className="w-full justify-start text-white hover:text-blue-200 hover:bg-blue-700">
            <LogOut className="mr-2 h-4 w-4" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-grow flex flex-col overflow-hidden">
        <h2 className="text-3xl font-bold p-6">Dashboard</h2>
        
        {/* Room scroll area */}
        <ScrollArea 
          id="room-scroll-container"
          className="flex-grow px-6 pb-6"
          onScroll={handleScroll}
        >
          {classData.map((room) => (
            <Card key={room.id} className="mb-6 last:mb-0 bg-white/10">
              <CardHeader>
                <CardTitle>{room.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <MetricCard
                    title="Temperature"
                    value={`${room.temperature}°C`}
                    icon={<Thermometer className="h-4 w-4" />}
                    color={getTemperatureColor(room.temperature)}
                  />
                  <MetricCard
                    title="Humidity"
                    value={`${room.humidity}%`}
                    icon={<Droplets className="h-4 w-4" />}
                    color={getHumidityColor(room.humidity)}
                  />
                  <MetricCard
                    title="CO2"
                    value={`${room.co2} ppm`}
                    icon={<Wind className="h-4 w-4" />}
                    color={getCO2Color(room.co2)}
                  />
                </div>
                <Button 
                  className="mt-4 w-full"
                  variant="secondary"
                  onClick={() => handleAlertClick(room)}
                >
                  Set Alert
                </Button>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
        
        {/* Room indicators */}
        <TooltipProvider>
          <div className="flex justify-center p-4 bg-blue-800 overflow-x-auto text-white">
            {classData.map((room, index) => (
              <Tooltip key={room.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => scrollToRoom(index)}
                    className={`w-2 h-2 rounded-full mx-1 flex-shrink-0 transition-all ${
                      index === activeRoom ? 'bg-white scale-150' : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{room.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </main>
    </div>
  )
}

function NavLink({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Link href={href} className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200">
      {icon}
      <span className="text-lg">{children}</span>
    </Link>
  )
}

function MetricCard({ title, value, icon, color }: { title: string; value: string; icon: React.ReactNode; color: string }) {
  return (
    <Card className={`bg-white/20 ${color}`}>
      <CardContent className="p-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold">{title}</span>
          {icon}
        </div>
        <p className="text-lg font-bold">{value}</p>
      </CardContent>
    </Card>
  )
}

function getTemperatureColor(temp: number): string {
  if (temp < 18) return 'text-blue-300'
  if (temp > 26) return 'text-red-300'
  return 'text-green-300'
}

function getHumidityColor(humidity: number): string {
  if (humidity < 30) return 'text-yellow-300'
  if (humidity > 60) return 'text-blue-300'
  return 'text-green-300'
}

function getCO2Color(co2: number): string {
  if (co2 < 600) return 'text-green-300'
  if (co2 > 1000) return 'text-red-300'
  return 'text-yellow-300'
}