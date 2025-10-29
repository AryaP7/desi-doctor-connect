"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Phone, Mail, ArrowLeft } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Patient {
  id: string
  name: string
  phone: string
  email: string
  age: number
  lastVisit: string
}

interface PatientListProps {
  onSelectPatient: (patientId: string) => void
  onBack: () => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export default function PatientList({ onSelectPatient, onBack, searchQuery, setSearchQuery }: PatientListProps) {
  const [patients, setPatients] = useState<Patient[]>([])
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch patients from API
    const fetchPatients = async () => {
      try {
        const response = await fetch("/api/doctor/patients")
        const data = await response.json()
        setPatients(data)
        setFilteredPatients(data)
      } catch (error) {
        console.error("Error fetching patients:", error)
        // Mock data for demo
        const mockPatients: Patient[] = [
          {
            id: "1",
            name: "John Doe",
            phone: "+1 (555) 123-4567",
            email: "john@example.com",
            age: 35,
            lastVisit: "2025-10-20",
          },
          {
            id: "2",
            name: "Jane Smith",
            phone: "+1 (555) 234-5678",
            email: "jane@example.com",
            age: 28,
            lastVisit: "2025-10-15",
          },
          {
            id: "3",
            name: "Robert Johnson",
            phone: "+1 (555) 345-6789",
            email: "robert@example.com",
            age: 45,
            lastVisit: "2025-10-10",
          },
        ]
        setPatients(mockPatients)
        setFilteredPatients(mockPatients)
      } finally {
        setLoading(false)
      }
    }

    fetchPatients()
  }, [])

  useEffect(() => {
    const filtered = patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.phone.includes(searchQuery) ||
        patient.email.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setFilteredPatients(filtered)
  }, [searchQuery, patients])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Patient List</h2>
          <p className="text-sm text-muted-foreground">Total patients: {patients.length}</p>
        </div>
        <Button variant="outline" onClick={onBack} className="gap-2 bg-transparent">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, phone, or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Patient Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full text-center py-8">
            <p className="text-muted-foreground">Loading patients...</p>
          </div>
        ) : filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <Card
              key={patient.id}
              className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onSelectPatient(patient.id)}
            >
              <div className="flex items-start gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback>
                    {patient.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{patient.name}</h3>
                  <p className="text-sm text-muted-foreground">Age: {patient.age}</p>
                  <div className="mt-3 space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span className="truncate">{patient.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{patient.email}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Last visit: {patient.lastVisit}</p>
                </div>
              </div>
              <Button className="w-full mt-4">View Report</Button>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-muted-foreground">No patients found</p>
          </div>
        )}
      </div>
    </div>
  )
}


