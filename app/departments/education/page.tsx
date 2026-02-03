import Header from "@/components/education/header"
import { StatsCards } from "@/components/education/stats-cards"
import { ThematicOverview } from "@/components/education/thematic-overview"
import { LinkageScaleLegend } from "@/components/education/linkage-scale"
import { ProjectPhaseLegend } from "@/components/education/project-phase"
import { ProgramTable } from "@/components/education/program-table"
import { IndicatorsPanel } from "@/components/education/indicators-panel"
import { ThematicDistributionChart, PhaseDistributionChart, LinkageScoreChart } from "@/components/education/charts"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EducationDepartmentPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <StatsCards department="शिक्षा विभाग" />
        <ThematicOverview department="education" />

        <Tabs defaultValue="programs" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="indicators">Indicators</TabsTrigger>
            <TabsTrigger value="scales">Scales & Tools</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="programs" className="space-y-6">
            <ProgramTable />
          </TabsContent>

          <TabsContent value="indicators" className="space-y-6">
            <IndicatorsPanel />
          </TabsContent>

          <TabsContent value="scales" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LinkageScaleLegend />
              <ProjectPhaseLegend />
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ThematicDistributionChart />
              <PhaseDistributionChart />
              <LinkageScoreChart />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-border mt-8 py-6 bg-card">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 Kathmandu Metropolitan City | शिक्षा विभाग | Education Department</p>
          <p className="mt-1">Program Mapping System v1.0 - Aligned with SDG, ISO 37120, and SCI 2025</p>
        </div>
      </footer>
    </div>
  )
}
