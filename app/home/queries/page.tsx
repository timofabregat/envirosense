'use client';

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LayoutDashboard, Search, Settings, LogOut } from "lucide-react"
import Link from 'next/link'

// Mock data for query results
const mockResults = [
  { id: 1, className: 'Room 101', date: '2023-05-01', temperature: 22.5, humidity: 45, co2: 800 },
  { id: 2, className: 'Room 102', date: '2023-05-01', temperature: 23.1, humidity: 48, co2: 750 },
  { id: 3, className: 'Room 101', date: '2023-05-02', temperature: 22.8, humidity: 46, co2: 820 },
  { id: 4, className: 'Room 102', date: '2023-05-02', temperature: 23.5, humidity: 49, co2: 780 },
  { id: 5, className: 'Room 103', date: '2023-05-02', temperature: 21.9, humidity: 44, co2: 790 },
]

export default function QueriesPage() {
  const [classes, setClasses] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [results, setResults] = useState(mockResults)

  const handleQuery = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would fetch data from an API here
    // For now, we'll just filter the mock data
    const filteredResults = mockResults.filter(result => 
      (!classes || result.className.includes(classes)) &&
      (!startDate || result.date >= startDate) &&
      (!endDate || result.date <= endDate)
    )
    setResults(filteredResults)
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 p-6 space-y-4">
        <h1 className="text-2xl font-bold mb-8">Class-Temp</h1>
        <nav className="space-y-2">
          <Link href="/dashboard" className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link href="/queries" className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200">
            <Search size={20} />
            <span>Queries</span>
          </Link>
          <Link href="/config" className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200">
            <Settings size={20} />
            <span>Config</span>
          </Link>
        </nav>
        <div className="pt-8">
          <Button variant="ghost" className="w-full justify-start text-white hover:text-blue-200 hover:bg-blue-700">
            <LogOut className="mr-2 h-4 w-4" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-grow p-8 overflow-auto">
        <h2 className="text-3xl font-bold mb-6">Queries</h2>
        
        {/* Query Form */}
        <form onSubmit={handleQuery} className="bg-white/10 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="classes" className="text-white">Classes</Label>
              <Input
                id="classes"
                value={classes}
                onChange={(e) => setClasses(e.target.value)}
                className="mt-1 bg-white text-blue-600 placeholder-blue-300"
                placeholder="e.g. Room 101, Room 102"
              />
            </div>
            <div>
              <Label htmlFor="startDate" className="text-white">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 bg-white text-blue-600"
              />
            </div>
            <div>
              <Label htmlFor="endDate" className="text-white">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 bg-white text-blue-600"
              />
            </div>
          </div>
          <Button type="submit" className="mt-4 bg-white text-blue-600 hover:bg-blue-100">
            Run Query
          </Button>
        </form>

        {/* Results Table */}
        <div className="bg-white/10 rounded-lg p-6 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">Class</TableHead>
                <TableHead className="text-white">Date</TableHead>
                <TableHead className="text-white">Temperature (°C)</TableHead>
                <TableHead className="text-white">Humidity (%)</TableHead>
                <TableHead className="text-white">CO2 (ppm)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result) => (
                <TableRow key={result.id}>
                  <TableCell className="text-white">{result.className}</TableCell>
                  <TableCell className="text-white">{result.date}</TableCell>
                  <TableCell className="text-white">{result.temperature}</TableCell>
                  <TableCell className="text-white">{result.humidity}</TableCell>
                  <TableCell className="text-white">{result.co2}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  )
}