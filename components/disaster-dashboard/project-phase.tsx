"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Circle, Clock, Flag, AlertTriangle } from "lucide-react"

interface ProjectPhaseProps {
  phase: "planning" | "preparedness" | "response" | "recovery"
  progress: number
}

const phaseConfig = {
  planning: {
    icon: Circle,
    color: "text-gray-500",
    bgColor: "bg-gray-100",
    label: "Planning",
    labelNp: "योजना",
    range: "0-25%",
  },
  preparedness: {
    icon: Clock,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
    label: "Preparedness",
    labelNp: "तयारी",
    range: "26-50%",
  },
  response: {
    icon: AlertTriangle,
    color: "text-amber-500",
    bgColor: "bg-amber-100",
    label: "Response",
    labelNp: "प्रतिक्रिया",
    range: "51-75%",
  },
  recovery: {
    icon: Flag,
    color: "text-green-500",
    bgColor: "bg-green-100",
    label: "Recovery",
    labelNp: "पुनःस्थापना",
    range: "76-100%",
  },
}

const phases: ("planning" | "preparedness" | "response" | "recovery")[] = [
  "planning",
  "preparedness",
  "response",
  "recovery",
]

export function ProjectPhase({ phase, progress }: ProjectPhaseProps) {
  const currentPhaseIndex = phases.indexOf(phase)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-foreground">Project Phase / परियोजना चरण</h4>
        <Badge variant="outline" className="font-mono">
          {progress}%
        </Badge>
      </div>

      <Progress value={progress} className="h-3" />

      <div className="flex justify-between">
        {phases.map((p, idx) => {
          const config = phaseConfig[p]
          const Icon = config.icon
          const isActive = p === phase
          const isCompleted = idx < currentPhaseIndex

          return (
            <div key={p} className="flex flex-col items-center gap-1">
              <div
                className={`p-1.5 rounded-full transition-all ${
                  isActive
                    ? `${config.bgColor} ring-2 ring-offset-2 ring-offset-background`
                    : isCompleted
                      ? "bg-green-100"
                      : "bg-muted"
                }`}
                style={isActive ? { ringColor: config.color.replace("text-", "") } : {}}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                ) : (
                  <Icon className={`w-4 h-4 ${isActive ? config.color : "text-muted-foreground"}`} />
                )}
              </div>
              <span className={`text-[10px] font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                {config.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function DisasterProjectPhaseLegend() {
  return (
    <Card className="border border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2 text-foreground">
          Disaster Project Phases
          <Badge variant="outline" className="text-xs font-normal">
            0-100%
          </Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Track disaster project lifecycle from planning to recovery
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {phases.map((phase) => {
            const config = phaseConfig[phase]
            const Icon = config.icon

            return (
              <div
                key={phase}
                className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className={`p-2.5 rounded-lg ${config.bgColor}`}>
                  <Icon className={`w-5 h-5 ${config.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{config.label}</span>
                    <span className="text-muted-foreground">({config.labelNp})</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Progress Range: {config.range}</p>
                </div>
                <Badge variant="secondary" className="font-mono">
                  {config.range}
                </Badge>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
