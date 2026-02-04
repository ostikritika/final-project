"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { disasterThematicAreas as disasterThematicAreas, disasterPrograms } from "@/lib/disaster"
import { Heart, Siren, Flame, Leaf, Users, ClipboardCheck, Flag, AlertCircle } from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
  Heart,
  Siren,
  Flame,
  Leaf,
  Users,
  ClipboardCheck,
  Flag,
  AlertCircle,
}

export function ThematicOverviewDisaster() {
  return (
    <Card className="border border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-foreground">Parameters / आधार</CardTitle>
        <p className="text-sm text-muted-foreground">Disaster programs categorized by national and international standards</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {disasterThematicAreas.map((area) => {
            const programCount = disasterPrograms.filter((p) => p.thematicArea === area.id).length
            const totalBudget = disasterPrograms
              .filter((p) => p.thematicArea === area.id)
              .reduce((sum, p) => sum + p.budget, 0)
            const Icon = iconMap[area.icon] || Heart

            return (
              <div
                key={area.id}
                className="group relative p-4 rounded-xl border border-border hover:border-red-500/50 hover:shadow-md transition-all cursor-pointer bg-card"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg" style={{ backgroundColor: `${area.color}15` }}>
                    <Icon className="w-5 h-5" style={{ color: area.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm text-foreground truncate">{area.name}</h3>
                    <p className="text-xs text-muted-foreground truncate">{area.nameNp}</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {programCount} Programs
                  </Badge>
                  <span className="text-xs text-muted-foreground">रु. {(totalBudget / 1000).toFixed(1)}K</span>
                </div>

                <div className="mt-3 space-y-1">
                  <div className="flex flex-wrap gap-1">
                    {area.standards.sdg.slice(0, 2).map((s, i) => (
                      <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
                        {s}
                      </span>
                    ))}
                    {area.standards.iso.slice(0, 1).map((s, i) => (
                      <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-green-100 text-green-700">
                        {s}
                      </span>
                    ))}
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
