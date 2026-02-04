"use client"

import { Card, CardContent } from "@/components/ui/card"
import { disasterPrograms } from "@/lib/disaster"
import { FileText, DollarSign, Target, TrendingUp } from "lucide-react"

export function DisasterStatsCards() {
  const totalBudget = disasterPrograms.reduce((sum, p) => sum + p.budget, 0)

  const avgLinkage =
    disasterPrograms.reduce(
      (sum, p) =>
        sum +
        (p.linkageScores.sdgScore +
          p.linkageScores.isoScore +
          p.linkageScores.sciScore) /
          3,
      0
    ) / disasterPrograms.length

  const avgProgress =
    disasterPrograms.reduce((sum, p) => sum + p.projectPhase.progress, 0) /
    disasterPrograms.length

  const stats = [
    {
      title: "Total Programs",
      titleNp: "कुल कार्यक्रमहरू",
      value: disasterPrograms.length,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Budget",
      titleNp: "कुल बजेट",
      value: `रु. ${(totalBudget / 1000).toFixed(1)} करोड`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Avg. Linkage Score",
      titleNp: "औसत सम्बन्धन स्कोर",
      value: avgLinkage.toFixed(1) + "/5",
      icon: Target,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      title: "Avg. Progress",
      titleNp: "औसत प्रगति",
      value: avgProgress.toFixed(0) + "%",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon

        return (
          <Card key={stat.title} className="border border-border">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-xs text-muted-foreground/70">
                    {stat.titleNp}
                  </p>
                  <p className="text-2xl font-bold mt-2 text-foreground">
                    {stat.value}
                  </p>
                </div>

                {Icon && (
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
