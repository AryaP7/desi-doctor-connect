"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import PatientList from "@/components/doctor/patient-list"
import PatientReport from "@/components/doctor/patient-report"
import AppointmentCalendar from "@/components/doctor/appointment-calendar"

type View = "dashboard" | "patient-list" | "patient-report"

export default function DoctorV0() {
  const [currentView, setCurrentView] = useState<View>("dashboard")
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const handlePatientSelect = (patientId: string) => {
    setSelectedPatientId(patientId)
    setCurrentView("patient-report")
  }

  const handleBackToList = () => {
    setCurrentView("patient-list")
    setSelectedPatientId(null)
  }

  const handleBackToDashboard = () => {
    setCurrentView("dashboard")
    setSelectedPatientId(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Doctor Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage your patients and medical records</p>
          </div>
          <div className="text-sm text-muted-foreground">Dr. Profile</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {currentView === "dashboard" && (
          <div className="space-y-4">
            {/* Bento grid */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-3 auto-rows-[1fr] max-w-5xl mx-auto">
              {/* Patient List teaser */}
              <Card
                className="p-3 hover:shadow-lg transition-shadow cursor-pointer md:col-span-2 md:row-span-1"
                onClick={() => setCurrentView("patient-list")}
              >
                <div className="space-y-1.5">
                  <h3 className="text-sm font-semibold">Patient List</h3>
                  <p className="text-xs text-muted-foreground">View and manage your registered patients</p>
                  <Button className="w-full mt-2 h-9 text-sm">View Patients</Button>
                </div>
              </Card>

              {/* Calendar Overview - compact tile */}
              <div className="hover:shadow-lg transition-shadow rounded-lg md:col-span-4 md:row-span-2 min-h-[180px] max-w-[520px] w-full">
                <AppointmentCalendar patientId="overview" />
              </div>

              {/* Recent Patients - compact tile */}
              <Card className="p-3 md:col-span-2 md:row-span-1 min-h-[120px]">
                <h2 className="text-base font-semibold mb-1.5">Recent Patients</h2>
                <p className="text-xs text-muted-foreground">Open Patient List to view details</p>
              </Card>
            </div>
          </div>
        )}

        {currentView === "patient-list" && (
          <PatientList
            onSelectPatient={handlePatientSelect}
            onBack={handleBackToDashboard}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {currentView === "patient-report" && selectedPatientId && (
          <PatientReport patientId={selectedPatientId} onBack={handleBackToList} />
        )}
      </main>
    </div>
  )
}


