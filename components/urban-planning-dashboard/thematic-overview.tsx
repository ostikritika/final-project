"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getUrbanPlanningThematicAreaStats } from "@/lib/urban-planning-data"
import { Landmark, ClipboardList, Cpu, AlertTriangle, TrendingUp, Wallet, BookOpen, Scale } from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
  Landmark,
  ClipboardList,
  Cpu,
  AlertTriangle,
  TrendingUp,
  Wallet,
  BookOpen,
  Scale,
}

export function UrbanPlanningThematicOverview() {
  const thematicStats = getUrbanPlanningThematicAreaStats()

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg">Thematic Areas Overview</CardTitle>
        <p className="text-sm text-muted-foreground">विषयगत क्षेत्र अवलोकन</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {thematicStats.map((area) => {
            const Icon = iconMap[area.icon] || Landmark
            return (
              <div
                key={area.id}
                className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                style={{ borderLeftColor: area.color, borderLeftWidth: 4 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="h-4 w-4" style={{ color: area.color }} />
                  <span className="font-medium text-sm text-foreground">{area.name}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{area.nameNp}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Programs:</span>
                    <span className="font-medium">{area.programCount}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Budget:</span>
                    <span className="font-medium">NPR {(area.totalBudget / 1000).toFixed(1)}M</span>
                  </div>
                  <div className="flex gap-1 mt-2">
                    <Badge variant="outline" className="text-xs px-1">
                      SDG: {area.avgSdgScore}
                    </Badge>
                    <Badge variant="outline" className="text-xs px-1">
                      ISO: {area.avgIsoScore}
                    </Badge>
                    <Badge variant="outline" className="text-xs px-1">
                      SCI: {area.avgSciScore}
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
