// "use client"

// import { Card, CardContent } from "@/components/ui/card"
// import { educationPrograms } from "@/lib/education-data"

// import { FileText, DollarSign, Target, TrendingUp } from "lucide-react"

// interface StatsCardsProps {
//   department?: string // optional
// }

// export function StatsCards({ department }: StatsCardsProps)  {
// const totalBudget = educationPrograms.reduce((sum, p) => sum + p.budget, 0)
// const avgLinkage =
//   educationPrograms.reduce(
//     (sum, p) => sum + (p.linkageScores.sdgScore + p.linkageScores.isoScore + p.linkageScores.sciScore) / 3,
//     0,
//   ) / educationPrograms.length
// const avgProgress = educationPrograms.reduce((sum, p) => sum + p.projectPhase.progress, 0) / educationPrograms.length

//   const stats = [
//     {
//       title: "Total Programs",
//       titleNp: "कुल कार्यक्रमहरू",
//       value: educationPrograms.length,
//       icon: FileText,
//       color: "text-blue-600",
//       bgColor: "bg-blue-50",
//     },
//     {
//       title: "Total Budget",
//       titleNp: "कुल बजेट",
//       value: `रु. {(totalBudget / 1000).toFixed(1)} करोड`,
//       icon: DollarSign,
//       color: "text-green-600",
//       bgColor: "bg-green-50",
//     },
//     {
//       title: "Avg. Linkage Score",
//       titleNp: "औसत सम्बन्धन स्कोर",
//       value: avgLinkage.toFixed(1) + "/5",
//       icon: Target,
//       color: "text-amber-600",
//       bgColor: "bg-amber-50",
//     },
//     {
//       title: "Avg. Progress",
//       titleNp: "औसत प्रगति",
//       value: avgProgress.toFixed(0) + "%",
//       icon: TrendingUp,
//       color: "text-purple-600",
//       bgColor: "bg-purple-50",
//     },
//   ]

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//       {stats.map((stat) => (
//         <Card key={stat.title} className="border border-border">
//           <CardContent className="p-5">
//             <div className="flex items-start justify-between">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
//                 <p className="text-xs text-muted-foreground/70">{stat.titleNp}</p>
//                 <p className="text-2xl font-bold mt-2 text-foreground">{stat.value}</p>
//               </div>
//               <div className={`p-3 rounded-lg ${stat.bgColor}`}>
//                 <stat.icon className={`w-5 h-5 ${stat.color}`} />
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   )
// }


"use client"

import { Card, CardContent } from "@/components/ui/card"
import { educationPrograms } from "@/lib/education-data"

import { FileText, DollarSign, Target, TrendingUp } from "lucide-react"

// ✅ Add props interface
interface StatsCardsProps {
  department?: string // optional
}

export function StatsCards({ department }: StatsCardsProps) {
  // Filter programs by department if provided
  const programs = department
    ? educationPrograms.filter((p) => p.department === department)
    : educationPrograms

  // If no programs match, show a friendly message
  if (programs.length === 0) {
    return (
      <div className="p-5 border border-border rounded-lg text-center text-muted-foreground">
        No programs found for {department || "any department"}.
      </div>
    )
  }

  const totalBudget = programs.reduce((sum, p) => sum + p.budget, 0)
  const avgLinkage =
    programs.reduce(
      (sum, p) => sum + (p.linkageScores.sdgScore + p.linkageScores.isoScore + p.linkageScores.sciScore) / 3,
      0,
    ) / programs.length
  const avgProgress = programs.reduce((sum, p) => sum + p.projectPhase.progress, 0) / programs.length

  const stats = [
    {
      title: "Total Programs",
      titleNp: "कुल कार्यक्रमहरू",
      value: programs.length,
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
      {stats.map((stat) => (
        <Card key={stat.title} className="border border-border">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-xs text-muted-foreground/70">{stat.titleNp}</p>
                <p className="text-2xl font-bold mt-2 text-foreground">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
