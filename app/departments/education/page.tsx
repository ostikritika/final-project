"use client"

import Header from "@/components/education/header"
import { StatsCards } from "@/components/education/stats-cards"
import { ThematicOverview } from "@/components/education/thematic-overview"
import { LinkageScaleLegend } from "@/components/education/linkage-scale"
import { ProjectPhaseLegend } from "@/components/education/project-phase"
import { ProgramTable } from "@/components/education/program-table"
import { IndicatorsPanel } from "@/components/education/indicators-panel"

import {
  ThematicDistributionChart,
  PhaseDistributionChart,
  LinkageScoreChart,
} from "@/components/education/charts"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import BudgetVisualization from "@/components/education/budget-visualization"

export default function EducationDepartmentPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <StatsCards department="शिक्षा विभाग" />
        <ThematicOverview department="education" />

    <Tabs defaultValue="programs" className="space-y-4">
  <TabsList className="flex space-x-4 w-full overflow-x-auto">
  <TabsTrigger value="programs">Programs</TabsTrigger>
  <TabsTrigger value="indicators">Indicators</TabsTrigger>
  <TabsTrigger value="scales">Scales & Tools</TabsTrigger>
  <TabsTrigger value="analytics">Analytics</TabsTrigger>
  <TabsTrigger value="budget">Budget Visualization</TabsTrigger>
</TabsList>


  {/* Programs Tab */}
  <TabsContent value="programs" className="space-y-6">
    <ProgramTable />
  </TabsContent>

  {/* Indicators Tab */}
  <TabsContent value="indicators" className="space-y-6">
    <IndicatorsPanel />
  </TabsContent>

  {/* Scales & Tools Tab */}
  <TabsContent value="scales" className="space-y-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <LinkageScaleLegend />
      <ProjectPhaseLegend />
    </div>
  </TabsContent>

  {/* Analytics Tab */}
  <TabsContent value="analytics" className="space-y-6">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <ThematicDistributionChart />
      <PhaseDistributionChart />
      <LinkageScoreChart />
    </div>
  </TabsContent>

  {/* Budget Tab */}
  <TabsContent value="budget" className="space-y-6 bg-muted p-6 rounded-lg">
    <BudgetVisualization />
  </TabsContent>
</Tabs>

      </main>

      <footer className="border-t border-border mt-8 py-6 bg-card">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 Kathmandu Metropolitan City | शिक्षा विभाग | Education Department</p>
          <p className="mt-1">
            Program Mapping System - Aligned with SDG, ISO 37120, and SCI 2025
          </p>
        </div>
      </footer>
    </div>
  )
}
