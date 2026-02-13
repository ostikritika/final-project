// "use client"

// import type React from "react"

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { thematicAreas, disasterPrograms, DisasterDepartment } from "@/lib/disaster-data"

// import {
//   Heart,
//   GraduationCap,
//   Laptop,
//   Building2,
//   ClipboardCheck,
//   Users,
//   Siren,
//   Leaf,
//   Book,
//   Pencil
// } from "lucide-react"

// const iconMap: Record<string, React.ElementType> = {
//   Heart,
//   GraduationCap,
//   Laptop,
//   Building2,
//   ClipboardCheck,
//   Users,
//   Siren,
//   Leaf,
//   Book,
//   Pencil
// }

// // Type definitions for TS safety
// interface DisasterProgram {
//   id: string
//   department: string
//   sector: string
//   subSector: string
//   mainProgram: string
//   programName: string
//   budget: number
//   thematicArea: string
// }

// interface ThematicArea {
//   id: string
//   name: string
//   nameNp: string
//   color: string
//   icon: string
//   standards: {
//     sdg: string[]
//     iso: string[]
//     sci?: string[]
//   }
// }

// export interface ThematicOverviewProps {
//   programs: DisasterDepartment[];
//   department?: string;
// }
  

// /* ✅ ONLY CHANGE: function signature */
// export function ThematicOverview({ department }: ThematicOverviewProps) {
//   return (
//     <Card className="border border-border">
//       <CardHeader className="pb-3">
//         <CardTitle className="text-lg font-semibold text-foreground">
//           Disaster Parameters/ विपद् आधार
//         </CardTitle>
//         <p className="text-sm text-muted-foreground">
//           Disaster programs categorized by national and international standards
//         </p>
//       </CardHeader>
//       <CardContent>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {thematicAreas.map((area: ThematicArea) => {
//             const programCount = disasterPrograms.filter(
//               (p: DisasterProgram) => p.thematicArea === area.id
//             ).length

//             const totalBudget = disasterPrograms
//               .filter((p: DisasterProgram ) => p.thematicArea === area.id)
//               .reduce((sum: number, p: DisasterProgram) => sum + p.budget, 0)

//             const Icon = iconMap[area.icon] || Heart

//             return (
//               <div
//                 key={area.id}
//                 className="group relative p-4 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all cursor-pointer bg-card"
//               >
//                 <div className="flex items-start gap-3">
//                   <div className="p-2.5 rounded-lg" style={{ backgroundColor: `${area.color}15` }}>
//                     <Icon className="w-5 h-5" style={{ color: area.color }} />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <h3 className="font-medium text-sm text-foreground truncate">
//                       {area.name}
//                     </h3>
//                     <p className="text-xs text-muted-foreground truncate">
//                       {area.nameNp}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mt-3 flex items-center justify-between">
//                   <Badge variant="secondary" className="text-xs">
//                     {programCount} Programs
//                   </Badge>
//                   <span className="text-xs text-muted-foreground">
//                     रु. {(totalBudget / 1000).toFixed(1)}K
//                   </span>
//                 </div>

//                 <div className="mt-3 space-y-1">
//                   <div className="flex flex-wrap gap-1">
//                     {area.standards.sdg.slice(0, 2).map((s: string, i: number) => (
//                       <span
//                         key={i}
//                         className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700"
//                       >
//                         {s}
//                       </span>
//                     ))}
//                     {area.standards.iso.slice(0, 1).map((s: string, i: number) => (
//                       <span
//                         key={i}
//                         className="text-[10px] px-1.5 py-0.5 rounded bg-green-100 text-green-700"
//                       >
//                         {s}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )
//           })}
//         </div>
//       </CardContent>
//     </Card>
//   )
// }


"use client"

import type React from "react"
import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  thematicAreas,
  disasterPrograms,
  DisasterDepartment,
} from "@/lib/disaster-data"

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
  Pencil,
} from "lucide-react"

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
  Pencil,
}

export interface ThematicOverviewProps {
  programs?: DisasterDepartment[]
  department?: string
}

/* ✅ CLEAN & SAFE VERSION */
export function ThematicOverview({
  programs,
  department,
}: ThematicOverviewProps) {
  // ✅ Use provided programs OR fallback to all
  const filteredPrograms = useMemo(() => {
    const base = programs ?? disasterPrograms

    return department
      ? base.filter((p) => p.department === department)
      : base
  }, [programs, department])

  // ✅ Pre-calculate counts & budgets (efficient)
  const thematicStats = useMemo(() => {
    return thematicAreas.map((area) => {
      const relatedPrograms = filteredPrograms.filter(
        (p) => p.thematicArea === area.id
      )

      const programCount = relatedPrograms.length

      const totalBudget = relatedPrograms.reduce(
        (sum, p) => sum + p.budget,
        0
      )

      return {
        ...area,
        programCount,
        totalBudget,
      }
    })
  }, [filteredPrograms])

  return (
    <Card className="border border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-foreground">
          Disaster Parameters / विपद् आधार
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Disaster programs categorized by national and international standards
        </p>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {thematicStats.map((area) => {
            const Icon =
              iconMap[area.icon as keyof typeof iconMap] || Heart

            return (
              <div
                key={area.id}
                className="group relative p-4 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all cursor-pointer bg-card"
              >
                {/* Header */}
                <div className="flex items-start gap-3">
                  <div
                    className="p-2.5 rounded-lg"
                    style={{
                      backgroundColor: `${area.color}15`,
                    }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: area.color }}
                    />
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

                {/* Stats */}
                <div className="mt-3 flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {area.programCount} Programs
                  </Badge>

                  <span className="text-xs text-muted-foreground">
                    रु. {(area.totalBudget / 1000).toFixed(1)}K
                  </span>
                </div>

                {/* Standards */}
                <div className="mt-3 space-y-1">
                  <div className="flex flex-wrap gap-1">
                    {area.standards.sdg.slice(0, 2).map((s, i) => (
                      <span
                        key={`sdg-${i}`}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700"
                      >
                        {s}
                      </span>
                    ))}

                    {area.standards.iso.slice(0, 1).map((s, i) => (
                      <span
                        key={`iso-${i}`}
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
