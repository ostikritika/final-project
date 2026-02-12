"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { thematicAreas, disasterPrograms, DisasterDepartment } from "@/lib/disaster-data"

import {
  Heart,
  GraduationCap,
  Laptop,
  Building2,
  ClipboardCheck,
  Users,
  Siren,
  Leaf,
  Book,
  Pencil
} from "lucide-react"

// Map your icons here, add any new ones from educationThematicAreas
const iconMap: Record<string, React.ElementType> = {
  Heart,
  GraduationCap,
  Laptop,
  Building2,
  ClipboardCheck,
  Users,
  Siren,
  Leaf,
  Book,
  Pencil
}

// Type definitions for TS safety
interface EducationProgram {
  id: string
  department: string
  sector: string
  subSector: string
  mainProgram: string
  programName: string
  budget: number
  thematicArea: string
}

interface ThematicArea {
  id: string
  name: string
  nameNp: string
  color: string
  icon: string
  standards: {
    sdg: string[]
    iso: string[]
    sci?: string[]
  }
}

export interface ThematicOverviewProps {
  programs: DisasterDepartment[];
  department?: string;
}
  

/* ✅ ONLY CHANGE: function signature */
export function ThematicOverview({ department }: ThematicOverviewProps) {
  return (
    <Card className="border border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-foreground">
          Education Parameters/ शिक्षा आधार
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Education programs categorized by national and international standards
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {thematicAreas.map((area: ThematicArea) => {
            const programCount = disasterPrograms.filter(
              (p: EducationProgram) => p.thematicArea === area.id
            ).length

            const totalBudget = disasterPrograms
              .filter((p: EducationProgram) => p.thematicArea === area.id)
              .reduce((sum: number, p: EducationProgram) => sum + p.budget, 0)

            const Icon = iconMap[area.icon] || Heart

            return (
              <div
                key={area.id}
                className="group relative p-4 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all cursor-pointer bg-card"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg" style={{ backgroundColor: `${area.color}15` }}>
                    <Icon className="w-5 h-5" style={{ color: area.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm text-foreground truncate">
                      {area.name}
                    </h3>
                    <p className="text-xs text-muted-foreground truncate">
                      {area.nameNp}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {programCount} Programs
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    रु. {(totalBudget / 1000).toFixed(1)}K
                  </span>
                </div>

                <div className="mt-3 space-y-1">
                  <div className="flex flex-wrap gap-1">
                    {area.standards.sdg.slice(0, 2).map((s: string, i: number) => (
                      <span
                        key={i}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700"
                      >
                        {s}
                      </span>
                    ))}
                    {area.standards.iso.slice(0, 1).map((s: string, i: number) => (
                      <span
                        key={i}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-green-100 text-green-700"
                      >
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
