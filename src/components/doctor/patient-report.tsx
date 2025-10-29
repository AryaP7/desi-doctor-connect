"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Phone, Mail, Video } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import BodyPainVisualization from "./body-pain-visualization"
import MedicalHistory from "./medical-history"
import AppointmentCalendar from "./appointment-calendar"
import PrescriptionManager from "./prescription-manager"

interface PatientReportProps {
  patientId: string
  onBack: () => void
}

interface PatientData {
  id: string
  name: string
  age: number
  phone: string
  email: string
  symptoms: string[]
  painAreas: { area: string; intensity: number }[]
}

export default function PatientReport({ patientId, onBack }: PatientReportProps) {
  const [patient, setPatient] = useState<PatientData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("symptoms")

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch(`/api/doctor/patients/${patientId}`)
        const data = await response.json()
        setPatient(data)
      } catch (error) {
        console.error("Error fetching patient data:", error)
        // Mock data for demo
        const mockPatient: PatientData = {
          id: patientId,
          name: "John Doe",
          age: 35,
          phone: "+1 (555) 123-4567",
          email: "john@example.com",
          symptoms: ["Headache", "Fever", "Cough", "Body Ache"],
          painAreas: [
            { area: "head", intensity: 8 },
            { area: "chest", intensity: 6 },
            { area: "back", intensity: 5 },
          ],
        }
        setPatient(mockPatient)
      } finally {
        setLoading(false)
      }
    }

    fetchPatientData()
  }, [patientId])

  if (loading) {
    return <div className="text-center py-8">Loading patient data...</div>
  }

  if (!patient) {
    return <div className="text-center py-8">Patient not found</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack} className="gap-2 bg-transparent">
          <ArrowLeft className="w-4 h-4" />
          Back to Patient List
        </Button>
      </div>

      {/* Patient Info Card */}
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback>
                {patient.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{patient.name}</h1>
              <p className="text-muted-foreground">Age: {patient.age}</p>
              <div className="flex gap-4 mt-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4" />
                  {patient.phone}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4" />
                  {patient.email}
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="gap-2">
              <Video className="w-4 h-4" />
              Video Call
            </Button>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="prescription">Prescription</TabsTrigger>
        </TabsList>

        <TabsContent value="symptoms" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Current Symptoms</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
              {patient.symptoms.map((symptom, idx) => (
                <div key={idx} className="bg-primary/10 text-primary px-3 py-2 rounded-lg text-sm font-medium">
                  {symptom}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Pain Location & Intensity</h2>
            <BodyPainVisualization painAreas={patient.painAreas} />
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <MedicalHistory patientId={patientId} />
        </TabsContent>

        <TabsContent value="calendar">
          <AppointmentCalendar patientId={patientId} />
        </TabsContent>

        <TabsContent value="prescription">
          <PrescriptionManager patientId={patientId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}


