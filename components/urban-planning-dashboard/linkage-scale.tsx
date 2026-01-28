"use client"

import { Badge } from "@/components/ui/badge"
import { urbanPlanningLinkageTypes } from "@/lib/urban-planning-data"

interface LinkageScores {
  sdgScore: number
  isoScore: number
  sciScore: number
  linkageType: "research" | "discussion" | "concurrence" | "declaration"
}

interface Props {
  scores: LinkageScores
}

export function UrbanPlanningLinkageScale({ scores }: Props) {
  const getLinkageLabel = (score: number) => {
    if (score === 0) return { label: "No Link", color: "bg-gray-200" }
    if (score <= 2) return { label: "Indirect", color: "bg-amber-400" }
    if (score <= 4) return { label: "Partial", color: "bg-blue-400" }
    return { label: "Direct", color: "bg-emerald-500" }
  }

  const linkageType = urbanPlanningLinkageTypes.find((t) => t.value === scores.linkageType)

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="flex justify-between text-xs mb-1">
            <span>SDG Alignment</span>
            <span className="font-medium">{scores.sdgScore}/5</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full ${getLinkageLabel(scores.sdgScore).color}`}
              style={{ width: `${(scores.sdgScore / 5) * 100}%` }}
            />
          </div>
        </div>
        <Badge variant="outline" className="text-xs">
          {getLinkageLabel(scores.sdgScore).label}
        </Badge>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="flex justify-between text-xs mb-1">
            <span>ISO 37120 Alignment</span>
            <span className="font-medium">{scores.isoScore}/5</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full ${getLinkageLabel(scores.isoScore).color}`}
              style={{ width: `${(scores.isoScore / 5) * 100}%` }}
            />
          </div>
        </div>
        <Badge variant="outline" className="text-xs">
          {getLinkageLabel(scores.isoScore).label}
        </Badge>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="flex justify-between text-xs mb-1">
            <span>SCI 2025 Alignment</span>
            <span className="font-medium">{scores.sciScore}/5</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full ${getLinkageLabel(scores.sciScore).color}`}
              style={{ width: `${(scores.sciScore / 5) * 100}%` }}
            />
          </div>
        </div>
        <Badge variant="outline" className="text-xs">
          {getLinkageLabel(scores.sciScore).label}
        </Badge>
      </div>

      <div className="pt-2 border-t">
        <p className="text-xs text-muted-foreground">
          Verification Type: <span className="font-medium text-foreground">{linkageType?.label}</span>
          <span className="text-muted-foreground"> - {linkageType?.description}</span>
        </p>
      </div>
    </div>
  )
}
