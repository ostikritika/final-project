"use client"

import { Badge } from "@/components/ui/badge"
import { urbanPlanningProjectPhases } from "@/lib/urban-planning-data"

interface ProjectPhase {
  phase: "inception" | "approval" | "tender" | "award" | "completion"
  progress: number
}

interface Props {
  phase: ProjectPhase
}

export function UrbanPlanningProjectPhase({ phase }: Props) {
  const phaseColors: Record<string, string> = {
    inception: "bg-slate-500",
    approval: "bg-amber-500",
    tender: "bg-blue-500",
    award: "bg-cyan-500",
    completion: "bg-emerald-500",
  }

  const currentPhaseIndex = urbanPlanningProjectPhases.findIndex((p) => p.value === phase.phase)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {urbanPlanningProjectPhases.map((p, index) => (
          <div key={p.value} className="flex items-center">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium ${
                index <= currentPhaseIndex ? `${phaseColors[p.value]} text-white` : "bg-muted text-muted-foreground"
              }`}
            >
              {index + 1}
            </div>
            {index < urbanPlanningProjectPhases.length - 1 && (
              <div
                className={`h-1 w-8 mx-1 ${
                  index < currentPhaseIndex ? phaseColors[urbanPlanningProjectPhases[index + 1].value] : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between text-xs">
        {urbanPlanningProjectPhases.map((p) => (
          <span
            key={p.value}
            className={p.value === phase.phase ? "font-medium text-foreground" : "text-muted-foreground"}
          >
            {p.label}
          </span>
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Overall Progress</span>
          <span className="font-medium">{phase.progress}%</span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full ${phaseColors[phase.phase]} transition-all`}
            style={{ width: `${phase.progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0%</span>
          <span>20%</span>
          <span>40%</span>
          <span>60%</span>
          <span>80%</span>
          <span>100%</span>
        </div>
      </div>

      <div className="pt-2">
        <Badge className={`${phaseColors[phase.phase]} text-white`}>
          Current Phase: {urbanPlanningProjectPhases.find((p) => p.value === phase.phase)?.label}
        </Badge>
      </div>
    </div>
  )
}
