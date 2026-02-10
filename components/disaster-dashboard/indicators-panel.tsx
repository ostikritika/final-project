"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { disasterIndicators, disasterPrograms } from "@/lib/disaster"
import { Globe, FileText, BarChart3 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function IndicatorsPanel() {
  const getStandardIcon = (standard?: string) => {
    switch (standard) {
      case "SDG":
        return <Globe className="w-4 h-4 text-blue-500" />
      case "ISO 37120":
        return <FileText className="w-4 h-4 text-green-500" />
      case "SCI 2025":
        return <BarChart3 className="w-4 h-4 text-amber-500" />
      case "Combined":
        return <Globe className="w-4 h-4 text-purple-500" />
      default:
        return null
    }
  }

  const getStandardColor = (standard?: string) => {
    switch (standard) {
      case "SDG":
        return { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700" }
      case "ISO 37120":
        return { bg: "bg-green-50", border: "border-green-200", text: "text-green-700" }
      case "SCI 2025":
        return { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700" }
      case "Combined":
        return { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700" }
      default:
        return { bg: "bg-gray-50", border: "border-gray-200", text: "text-gray-700" }
    }
  }

  return (
    <Card className="border border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-foreground">
          Disaster Key Indicators / बिपद सम्बन्धी मुख्य सूचकहरू
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Disaster-related indicators aligned with ISO 37120, SDG, and SCI 2025
        </p>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {disasterIndicators.map((indicator) => {
            const colors = getStandardColor(indicator.standard)

            // Filter programs dynamically for this indicator
            const relatedProgramsList = disasterPrograms.filter(
              (p) =>
                p.sdg.direct.includes(indicator.code) ||
                p.sdg.indirect.includes(indicator.code) ||
                p.iso37120.direct.includes(indicator.code) ||
                p.iso37120.indirect.includes(indicator.code) ||
                p.sci2025.direct.includes(indicator.code) ||
                p.sci2025.indirect.includes(indicator.code)
            )

            return (
              <div
                key={indicator.id}
                className={`p-4 rounded-lg border ${colors.border} ${colors.bg} hover:shadow-sm transition-shadow`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {getStandardIcon(indicator.standard)}

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge variant="outline" className={`text-xs ${colors.text}`}>
                            {indicator.code}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs text-xs">{indicator.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  {/* Show number of related disaster programs */}
                  <Badge variant="secondary" className="text-xs">
                    {relatedProgramsList.length} programs
                  </Badge>
                </div>

                <h4 className="font-medium mt-3 text-foreground">{indicator.name}</h4>
                <p className="text-xs text-muted-foreground">{indicator.nameNp}</p>

                {/* Optional: List related programs */}
                {relatedProgramsList.length > 0 && (
                  <ul className="mt-2 text-xs text-muted-foreground list-disc list-inside">
                    {relatedProgramsList.map((prog) => (
                      <li key={prog.id}>{prog.programName}</li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
