"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MedicalHistoryProps {
  patientId: string
}

interface ChronicCondition {
  id: string
  name: string
  diagnosedDate: string
  status: "active" | "resolved"
}

interface Prescription {
  id: string
  date: string
  doctor: string
  medications: string[]
  notes: string
  fileUrl?: string
}

export default function MedicalHistory({ patientId }: MedicalHistoryProps) {
  const [conditions, setConditions] = useState<ChronicCondition[]>([])
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const [condResponse, prescResponse] = await Promise.all([
          fetch(`/api/doctor/patients/${patientId}/conditions`),
          fetch(`/api/doctor/patients/${patientId}/prescriptions`),
        ])

        const condData = await condResponse.json()
        const prescData = await prescResponse.json()

        setConditions(condData)
        setPrescriptions(prescData)
      } catch (error) {
        console.error("Error fetching history:", error)
        // Mock data
        setConditions([
          { id: "1", name: "Hypertension", diagnosedDate: "2020-05-15", status: "active" },
          { id: "2", name: "Type 2 Diabetes", diagnosedDate: "2019-03-20", status: "active" },
          { id: "3", name: "Asthma", diagnosedDate: "2015-08-10", status: "active" },
        ])
        setPrescriptions([
          {
            id: "1",
            date: "2025-10-20",
            doctor: "Dr. Smith",
            medications: ["Lisinopril 10mg", "Metformin 500mg"],
            notes: "Follow up in 2 weeks",
          },
          {
            id: "2",
            date: "2025-09-15",
            doctor: "Dr. Johnson",
            medications: ["Atorvastatin 20mg", "Aspirin 81mg"],
            notes: "Continue current regimen",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [patientId])

  return (
    <Tabs defaultValue="conditions" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="conditions">Chronic Conditions</TabsTrigger>
        <TabsTrigger value="prescriptions">Previous Prescriptions</TabsTrigger>
      </TabsList>

      <TabsContent value="conditions" className="space-y-4">
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : conditions.length > 0 ? (
          <div className="space-y-3">
            {conditions.map((condition) => (
              <Card key={condition.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{condition.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Diagnosed: {new Date(condition.diagnosedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      condition.status === "active" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                    }`}
                  >
                    {condition.status === "active" ? "Active" : "Resolved"}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">No chronic conditions recorded</div>
        )}
      </TabsContent>

      <TabsContent value="prescriptions" className="space-y-4">
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : prescriptions.length > 0 ? (
          <div className="space-y-3">
            {prescriptions.map((prescription) => (
              <Card key={prescription.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{new Date(prescription.date).toLocaleDateString()}</h3>
                    <p className="text-sm text-muted-foreground">By {prescription.doctor}</p>
                  </div>
                  {prescription.fileUrl && (
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  )}
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Medications:</p>
                    <ul className="list-disc list-inside text-sm">
                      {prescription.medications.map((med, idx) => (
                        <li key={idx}>{med}</li>
                      ))}
                    </ul>
                  </div>
                  {prescription.notes && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Notes:</p>
                      <p className="text-sm">{prescription.notes}</p>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">No previous prescriptions</div>
        )}
      </TabsContent>
    </Tabs>
  )
}


