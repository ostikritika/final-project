"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  urbanPlanningPrograms,
  getTotalUrbanPlanningBudget,
  urbanPlanningThematicAreas,
} from "@/lib/urban-planning-data"
import { FileText, Wallet, Target, TrendingUp } from "lucide-react"

export function UrbanPlanningStatsCards() {
  const totalPrograms = urbanPlanningPrograms.length
  const totalBudget = getTotalUrbanPlanningBudget()
  const avgCompletion = Math.round(
    urbanPlanningPrograms.reduce((sum, p) => sum + p.projectPhase.progress, 0) / totalPrograms,
  )
  const directSdgLinks = urbanPlanningPrograms.filter(
    (p) => p.sdg.direct && p.sdg.direct !== "No" && p.sdg.direct !== "NO",
  ).length

  const stats = [
    {
      label: "Total Programs",
      labelNp: "कुल कार्यक्रम",
      value: totalPrograms,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      label: "Total Budget",
      labelNp: "कुल बजेट",
      value: `NPR ${(totalBudget / 1000).toFixed(1)}M`,
      icon: Wallet,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
    {
      label: "Thematic Areas",
      labelNp: "विषयगत क्षेत्र",
      value: urbanPlanningThematicAreas.length,
      icon: Target,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
    {
      label: "Direct SDG Links",
      labelNp: "प्रत्यक्ष SDG लिंक",
      value: directSdgLinks,
      icon: TrendingUp,
      color: "text-cyan-600",
      bgColor: "bg-cyan-100",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-xs text-muted-foreground/70">{stat.labelNp}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
