"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

interface BodyPainVisualizationProps {
  painAreas: { area: string; intensity: number }[]
}

const getColorByIntensity = (intensity: number) => {
  if (intensity >= 8) return "#ef4444" // red
  if (intensity >= 6) return "#f97316" // orange
  if (intensity >= 4) return "#eab308" // yellow
  return "#84cc16" // lime
}

function BodyModel({ painAreas }: BodyPainVisualizationProps) {
  return (
    <group>
      {/* Head */}
      <mesh position={[0, 2.5, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color={
            painAreas.find((p) => p.area === "head")
              ? getColorByIntensity(painAreas.find((p) => p.area === "head")!.intensity)
              : "#3b82f6"
          }
        />
      </mesh>

      {/* Torso */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[0.4, 1, 0.3]} />
        <meshStandardMaterial
          color={
            painAreas.find((p) => p.area === "chest")
              ? getColorByIntensity(painAreas.find((p) => p.area === "chest")!.intensity)
              : "#3b82f6"
          }
        />
      </mesh>

      {/* Left Arm */}
      <mesh position={[-0.5, 1.5, 0]}>
        <boxGeometry args={[0.15, 0.8, 0.15]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>

      {/* Right Arm */}
      <mesh position={[0.5, 1.5, 0]}>
        <boxGeometry args={[0.15, 0.8, 0.15]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>

      {/* Left Leg */}
      <mesh position={[-0.2, 0.2, 0]}>
        <boxGeometry args={[0.15, 1, 0.15]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>

      {/* Right Leg */}
      <mesh position={[0.2, 0.2, 0]}>
        <boxGeometry args={[0.15, 1, 0.15]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>

      {/* Back */}
      <mesh position={[0, 1.2, -0.2]}>
        <boxGeometry args={[0.4, 1, 0.1]} />
        <meshStandardMaterial
          color={
            painAreas.find((p) => p.area === "back")
              ? getColorByIntensity(painAreas.find((p) => p.area === "back")!.intensity)
              : "#3b82f6"
          }
        />
      </mesh>
    </group>
  )
}

export default function BodyPainVisualization({ painAreas }: BodyPainVisualizationProps) {
  return (
    <div className="space-y-4">
      <div className="w-full h-96 bg-slate-900 rounded-lg overflow-hidden">
        <Canvas camera={{ position: [0, 1.5, 2.5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <BodyModel painAreas={painAreas} />
          <OrbitControls />
        </Canvas>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-sm">Severe (8-10)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-500 rounded"></div>
          <span className="text-sm">Moderate (6-7)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span className="text-sm">Mild (4-5)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-lime-500 rounded"></div>
          <span className="text-sm">Minimal (1-3)</span>
        </div>
      </div>

      {/* Pain Areas List */}
      <div className="space-y-2">
        <h3 className="font-semibold">Affected Areas:</h3>
        {painAreas.map((area, idx) => (
          <div key={idx} className="flex items-center justify-between p-2 bg-muted rounded">
            <span className="capitalize">{area.area}</span>
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: getColorByIntensity(area.intensity) }}
              ></div>
              <span className="text-sm font-medium">Intensity: {area.intensity}/10</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


