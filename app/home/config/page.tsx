'use client'

import React, { useState, useEffect } from 'react'
import { LayoutDashboard, Search, Settings, LogOut, Save, Users } from "lucide-react"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { toast } from "@/components/ui/use-toast"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"

const roomsData = [
  { id: 1, name: 'Room 101', limits: { temperature: 24, humidity: 60, co2: 1000 }, subscribers: [] },
  { id: 2, name: 'Room 102', limits: { temperature: 26, humidity: 65, co2: 1200 }, subscribers: [] },
  { id: 3, name: 'Room 103', limits: { temperature: 25, humidity: 55, co2: 900 }, subscribers: [] },
]

const users = [
  { id: "alice", name: "Alice Johnson" },
  { id: "bob", name: "Bob Smith" },
  { id: "carol", name: "Carol Williams" },
  { id: "dave", name: "Dave Brown" },
  { id: "eve", name: "Eve Davis" },
]

export default function RoomConfigPage() {
  const [selectedRoom, setSelectedRoom] = useState<string | undefined>(undefined)
  const [limits, setLimits] = useState({
    temperature: 26,
    humidity: 60,
    co2: 1000
  })
  const [subscribers, setSubscribers] = useState<string[]>([])
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  useEffect(() => {
    if (selectedRoom) {
      const room = roomsData.find(r => r.id.toString() === selectedRoom)
      if (room) {
        setLimits(room.limits)
        setSubscribers(room.subscribers)
      }
    }
  }, [selectedRoom])

  const handleLimitChange = (measurement: keyof typeof limits, value: number) => {
    setLimits(prev => ({
      ...prev,
      [measurement]: value
    }))
  }

  const handleSubscriberToggle = (userId: string) => {
    setSubscribers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const handleSave = () => {
    console.log('Saving limits for room', selectedRoom, ':', limits)
    console.log('Subscribers:', subscribers)
    // toast({
    //   title: "Settings saved",
    //   description: `Limit settings and subscribers for ${roomsData.find(r => r.id.toString() === selectedRoom)?.name} have been saved successfully.`,
    // })
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 p-6 space-y-4 flex flex-col">
        <h1 className="text-2xl font-bold mb-8">EnviroSense</h1>
        <nav className="space-y-2 flex-grow">
          <Link href="/home/dashboard" className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200">
            <LayoutDashboard size={30} />
            <span className="text-lg">Dashboard</span>
          </Link>
          <Link href="/home/queries" className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200">
            <Search size={30} />
            <span className="text-lg">Queries</span>
          </Link>
          <Link href="/home/config" className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200">
            <Settings size={30} />
            <span className="text-lg">Config</span>
          </Link>
        </nav>
        <div className="pt-8">
          <button className="w-full flex items-center ml-1.5 justify-start text-white hover:text-blue-200 text-lg">
            <LogOut className="h-6 w-6 mr-2" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-grow overflow-y-auto">
        <div className="p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Room Configuration</h2>
          
          <Card className="mb-6 bg-white/10">
            <CardHeader>
              <CardTitle className="text-white">Select Room</CardTitle>
            </CardHeader>
            <CardContent>
              <Select onValueChange={setSelectedRoom} value={selectedRoom}>
                <SelectTrigger className="w-full bg-white text-blue-600">
                  <SelectValue placeholder="Select a room" />
                </SelectTrigger>
                <SelectContent>
                  {roomsData.map(room => (
                    <SelectItem key={room.id} value={room.id.toString()}>{room.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {selectedRoom && (
            <Card className="mb-6 bg-white/10">
              <CardHeader>
                <CardTitle className="text-white">Measurement Limits for {roomsData.find(r => r.id.toString() === selectedRoom)?.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <LimitSetting
                  title="Temperature (°C)"
                  value={limits.temperature}
                  onChange={(value) => handleLimitChange('temperature', value)}
                  min={0}
                  max={50}
                />
                <LimitSetting
                  title="Humidity (%)"
                  value={limits.humidity}
                  onChange={(value) => handleLimitChange('humidity', value)}
                  min={0}
                  max={100}
                />
                <LimitSetting
                  title="CO2 (ppm)"
                  value={limits.co2}
                  onChange={(value) => handleLimitChange('co2', value)}
                  min={0}
                  max={5000}
                />
                <div className="space-y-2">
                  <Label className="text-white">Subscribers</Label>
                  <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="w-full bg-white text-blue-600">
                        <Users className="mr-2 h-4 w-4" />
                        Manage Subscribers
                      </Button>
                    </SheetTrigger>
                    <SheetContent className='bg-white'>
                      <SheetHeader>
                        <SheetTitle>Select Subscribers</SheetTitle>
                      </SheetHeader>
                      <div className="py-4">
                        {users.map((user) => (
                          <div key={user.id} className="flex items-center space-x-2 mb-2">
                            <Checkbox
                              id={user.id}
                              checked={subscribers.includes(user.id)}
                              onCheckedChange={() => handleSubscriberToggle(user.id)}
                            />
                            <label
                              htmlFor={user.id}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {user.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </CardContent>
            </Card>
          )}
          
          {selectedRoom && (
            <Button onClick={handleSave} className="w-full bg-white/20 text-white hover:bg-blue-100 hover:text-blue-600">
              <Save className="mr-2 h-4 w-4" /> Save Settings
            </Button>
          )}
        </div>
      </main>
    </div>
  )
}

function LimitSetting({ title, value, onChange, min, max }: {
  title: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
}) {
  const handleDrag = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const slider = e.currentTarget.parentElement
    if (!slider) return

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const rect = slider.getBoundingClientRect()
      const newPosition = (moveEvent.clientX - rect.left) / rect.width
      const newValue = Math.round(min + newPosition * (max - min))
      onChange(newValue)
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const position = Math.min(((value - min) / (max - min)) * 100, 100)

  return (
    <div className="space-y-2">
      <Label className="text-white">{title}</Label>
      <div className="relative h-6">
        <div className="absolute inset-0 h-1 top-1/2 -translate-y-1/2 bg-white/20 rounded-full" />
        <div
          className="absolute inset-0 h-1 top-1/2 -translate-y-1/2 bg-white rounded-full"
          style={{ right: `${100 - position}%` }}
        />
        <button
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 -ml-2 bg-white rounded-full shadow"
          style={{ left: `${position}%` }}
          onMouseDown={handleDrag}
        />
      </div>
      <div className="flex justify-end items-center mt-2">
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          className="w-20 bg-white text-blue-600 placeholder-blue-300 rounded-md border-none focus:outline-none p-1 text-sm focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>
  )
}