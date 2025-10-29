"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Video } from "lucide-react"

interface AppointmentCalendarProps {
  patientId: string
}

interface Appointment {
  id: string
  date: string
  time: string
  type: "consultation" | "follow-up" | "check-up"
  status: "scheduled" | "completed" | "cancelled"
}

export default function AppointmentCalendar({ patientId }: AppointmentCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 29))
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`/api/doctor/patients/${patientId}/appointments`)
        const data = await response.json()
        setAppointments(data)
      } catch (error) {
        console.error("Error fetching appointments:", error)
        // Mock data
        setAppointments([
          {
            id: "1",
            date: "2025-10-29",
            time: "10:00 AM",
            type: "consultation",
            status: "scheduled",
          },
          {
            id: "2",
            date: "2025-11-05",
            time: "2:00 PM",
            type: "follow-up",
            status: "scheduled",
          },
          {
            id: "3",
            date: "2025-10-20",
            time: "11:30 AM",
            type: "check-up",
            status: "completed",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [patientId])

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i)

  const getAppointmentForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return appointments.find((apt) => apt.date === dateStr)
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  return (
    <div className="space-y-6">
      {/* Calendar */}
      <Card className="p-3">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-lg font-semibold">
            {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-8 px-2" onClick={previousMonth}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 px-2" onClick={nextMonth}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center font-semibold text-[10px] text-muted-foreground py-0.5">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {emptyDays.map((_, idx) => (
            <div key={`empty-${idx}`} className="aspect-square"></div>
          ))}
          {days.map((day) => {
            const appointment = getAppointmentForDate(day)
            const isToday =
              new Date().toDateString() ===
              new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString()

            return (
              <div
                key={day}
                className={`aspect-square p-1 rounded border flex flex-col items-center justify-center text-[11px] font-medium cursor-pointer transition-colors ${
                  isToday ? "border-primary bg-primary/10" : "border-border hover:border-primary"
                } ${appointment ? "bg-blue-50" : ""}`}
              >
                <span>{day}</span>
                {appointment && <div className="w-1 h-1 bg-blue-500 rounded-full mt-0.5"></div>}
              </div>
            )
          })}
        </div>
      </Card>

      {/* Upcoming Appointments */}
      <Card className="p-3">
        <h2 className="text-base font-semibold mb-2">Appointments</h2>
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : appointments.length > 0 ? (
          <div className="space-y-2.5">
            {appointments
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map((appointment) => (
                <div key={appointment.id} className="flex items-start justify-between p-3 bg-muted rounded-md">
                  <div>
                    <p className="font-medium text-sm">
                      {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">{appointment.type.replace("-", " ")}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        appointment.status === "scheduled"
                          ? "bg-blue-100 text-blue-800"
                          : appointment.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {appointment.status}
                    </span>
                    {appointment.status === "scheduled" && (
                      <Button size="sm" className="gap-1.5 h-8 px-2">
                        <Video className="w-4 h-4" />
                        Join
                      </Button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">No appointments scheduled</div>
        )}
      </Card>
    </div>
  )
}


