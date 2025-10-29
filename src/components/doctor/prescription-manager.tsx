"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2 } from "lucide-react"

interface PrescriptionManagerProps {
  patientId: string
}

interface Medication {
  id: string
  name: string
  dosage: string
  frequency: {
    breakfast: boolean
    lunch: boolean
    dinner: boolean
    quantity: number
  }
  duration: string
  notes: string
}

export default function PrescriptionManager({ patientId }: PrescriptionManagerProps) {
  const [medications, setMedications] = useState<Medication[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    frequency: {
      breakfast: false,
      lunch: false,
      dinner: false,
      quantity: 1,
    },
    duration: "",
    notes: "",
  })

  const handleAddMedication = () => {
    if (formData.name && formData.dosage) {
      const newMed: Medication = {
        id: Date.now().toString(),
        ...formData,
      }
      setMedications([...medications, newMed])
      setFormData({
        name: "",
        dosage: "",
        frequency: {
          breakfast: false,
          lunch: false,
          dinner: false,
          quantity: 1,
        },
        duration: "",
        notes: "",
      })
      setIsAdding(false)
    }
  }

  const handleRemoveMedication = (id: string) => {
    setMedications(medications.filter((med) => med.id !== id))
  }

  const handleSavePrescription = async () => {
    try {
      const response = await fetch(`/api/doctor/patients/${patientId}/prescriptions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ medications }),
      })
      if (response.ok) {
        alert("Prescription saved successfully!")
      }
    } catch (error) {
      console.error("Error saving prescription:", error)
      alert("Error saving prescription")
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="new" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="new">New Prescription</TabsTrigger>
          <TabsTrigger value="current">Current Medications</TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Add Medication</h2>

            {!isAdding ? (
              <Button onClick={() => setIsAdding(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Add New Medication
              </Button>
            ) : (
              <div className="space-y-4">
                {/* Medication Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">Medication Name</label>
                  <Input
                    placeholder="e.g., Aspirin, Lisinopril"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                {/* Dosage */}
                <div>
                  <label className="block text-sm font-medium mb-2">Dosage</label>
                  <Input
                    placeholder="e.g., 500mg, 10mg"
                    value={formData.dosage}
                    onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                  />
                </div>

                {/* Frequency */}
                <div>
                  <label className="block text-sm font-medium mb-3">Frequency</label>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.frequency.breakfast}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              frequency: { ...formData.frequency, breakfast: e.target.checked },
                            })
                          }
                          className="w-4 h-4"
                        />
                        <span className="text-sm">Before Breakfast</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.frequency.lunch}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              frequency: { ...formData.frequency, lunch: e.target.checked },
                            })
                          }
                          className="w-4 h-4"
                        />
                        <span className="text-sm">Before Lunch</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.frequency.dinner}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              frequency: { ...formData.frequency, dinner: e.target.checked },
                            })
                          }
                          className="w-4 h-4"
                        />
                        <span className="text-sm">Before Dinner</span>
                      </label>
                    </div>

                    {/* Tablet Quantity */}
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium">Tablets per dose:</label>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        value={formData.frequency.quantity}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            frequency: { ...formData.frequency, quantity: Number.parseInt(e.target.value) },
                          })
                        }
                        className="w-20"
                      />
                    </div>
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium mb-2">Duration</label>
                  <Input
                    placeholder="e.g., 7 days, 2 weeks, 1 month"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium mb-2">Notes</label>
                  <Input
                    placeholder="e.g., Take with food, avoid dairy"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button onClick={handleAddMedication}>Add to Prescription</Button>
                  <Button variant="outline" onClick={() => setIsAdding(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* Medications List */}
          {medications.length > 0 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Medications to Prescribe</h2>
              <div className="space-y-3">
                {medications.map((med) => (
                  <div key={med.id} className="p-4 bg-muted rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{med.name}</h3>
                        <p className="text-sm text-muted-foreground">{med.dosage}</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleRemoveMedication(med.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                    <div className="text-sm space-y-1">
                      <p>
                        <span className="font-medium">Frequency:</span>{" "}
                        {[
                          med.frequency.breakfast && "Before Breakfast",
                          med.frequency.lunch && "Before Lunch",
                          med.frequency.dinner && "Before Dinner",
                        ]
                          .filter(Boolean)
                          .join(", ")}{" "}
                        ({med.frequency.quantity} tablet{med.frequency.quantity > 1 ? "s" : ""} per dose)
                      </p>
                      <p>
                        <span className="font-medium">Duration:</span> {med.duration}
                      </p>
                      {med.notes && (
                        <p>
                          <span className="font-medium">Notes:</span> {med.notes}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Button onClick={handleSavePrescription} className="w-full mt-4">
                Save & Send Prescription
              </Button>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="current" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Current Medications</h2>
            <p className="text-muted-foreground">No current medications recorded</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


