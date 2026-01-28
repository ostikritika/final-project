"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { urbanPlanningIndicators } from "@/lib/urban-planning-data"
import { Target } from "lucide-react"

export function UrbanPlanningIndicatorsPanel() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Target className="h-5 w-5" />
          Key Performance Indicators
        </CardTitle>
        <p className="text-sm text-muted-foreground">प्रमुख सूचकहरू - SDG, ISO 37120, SCI 2025</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {urbanPlanningIndicators.map((indicator) => {
            const currentNum = Number.parseFloat(indicator.current.replace("%", ""))
            const targetNum = Number.parseFloat(indicator.target.replace("%", ""))
            const progress = (currentNum / targetNum) * 100

            return (
              <div key={indicator.id} className="p-4 rounded-lg border border-border">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-sm text-foreground">{indicator.name}</p>
                    <p className="text-xs text-muted-foreground">{indicator.nameNp}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {indicator.category}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Current: {indicator.current}</span>
                    <span className="text-muted-foreground">Target: {indicator.target}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${progress >= 80 ? "bg-emerald-500" : progress >= 50 ? "bg-blue-500" : "bg-amber-500"}`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs">
                      {indicator.sdg}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {indicator.iso}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {indicator.sci}
                    </Badge>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
