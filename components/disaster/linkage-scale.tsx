"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"

interface LinkageScaleProps {
  sdgScore: number
  isoScore: number
  sciScore: number
  linkageType: "research" | "discussion" | "concurrence" | "declaration"
}

const linkageTypeInfo = {
  research: {
    label: "Research-Based",
    color: "bg-green-500",
    description: "Backed by research and evidence (Score multiplier: 1.25)",
  },
  concurrence: {
    label: "Concurrence",
    color: "bg-blue-500",
    description: "Agreed upon by multiple stakeholders (Score multiplier: 1.0)",
  },
  discussion: {
    label: "Discussion",
    color: "bg-amber-500",
    description: "Discussed in meetings/workshops (Score multiplier: 0.75)",
  },
  declaration: {
    label: "Declaration",
    color: "bg-gray-400",
    description: "Official policy declaration without verification (Score multiplier: 0.5)",
  },
}

export function LinkageScale({ sdgScore, isoScore, sciScore, linkageType }: LinkageScaleProps) {
  const typeInfo = linkageTypeInfo[linkageType]

  const renderScale = (score: number, label: string, color: string) => {
    return (
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-foreground">{label}</span>
          <span className="text-xs font-bold text-foreground">{score}/5</span>
        </div>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={`h-2 flex-1 rounded-sm transition-colors ${level <= score ? color : "bg-muted"}`}
            />
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>No Link</span>
          <span>Indirect</span>
          <span>Direct</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-foreground">Linkage Scale (0-5)</h4>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge className={`${typeInfo.color} text-white text-xs`}>{typeInfo.label}</Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs text-xs">{typeInfo.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="space-y-4">
        {renderScale(sdgScore, "SDG Alignment", "bg-blue-500")}
        {renderScale(isoScore, "ISO 37120", "bg-green-500")}
        {renderScale(sciScore, "SCI 2025", "bg-amber-500")}
      </div>

      <div className="pt-2 border-t border-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Info className="w-3.5 h-3.5" />
          <span>0: No Link | 1-2: Indirect | 3-4: Partial Direct | 5: Full Direct</span>
        </div>
      </div>
    </div>
  )
}

export function LinkageScaleLegend() {
  return (
    <Card className="border border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2 text-foreground">
          Likert Scale Legend
          <Badge variant="outline" className="text-xs font-normal">
            0-5 Scale
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Linkage Scores</h4>
            <div className="space-y-2">
              {[
                { score: 0, label: "No Linkage", desc: "No connection to standard" },
                { score: 1, label: "Very Weak", desc: "Minimal indirect connection" },
                { score: 2, label: "Weak", desc: "Some indirect alignment" },
                { score: 3, label: "Moderate", desc: "Partial direct alignment" },
                { score: 4, label: "Strong", desc: "Clear direct alignment" },
                { score: 5, label: "Very Strong", desc: "Full direct alignment with verification" },
              ].map((item) => (
                <div key={item.score} className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                      item.score === 0
                        ? "bg-muted text-muted-foreground"
                        : item.score <= 2
                          ? "bg-amber-100 text-amber-700"
                          : item.score <= 4
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.score}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Verification Types</h4>
            <div className="space-y-2">
              {Object.entries(linkageTypeInfo).map(([key, info]) => (
                <div key={key} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${info.color}`} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{info.label}</p>
                    <p className="text-xs text-muted-foreground">{info.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
