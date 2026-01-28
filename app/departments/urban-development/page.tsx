import { UrbanPlanningHeader } from "@/components/urban-planning-dashboard/header"
import { UrbanPlanningStatsCards } from "@/components/urban-planning-dashboard/stats-cards"
import { UrbanPlanningThematicOverview } from "@/components/urban-planning-dashboard/thematic-overview"
import { UrbanPlanningProgramTable } from "@/components/urban-planning-dashboard/program-table"
import { UrbanPlanningIndicatorsPanel } from "@/components/urban-planning-dashboard/indicators-panel"
import { UrbanPlanningCharts } from "@/components/urban-planning-dashboard/charts"

export default function UrbanDevelopmentDepartmentPage() {
  return (
    <div className="min-h-screen bg-background">
      <UrbanPlanningHeader />
      <main className="container mx-auto px-4 py-6 space-y-6">
        <UrbanPlanningStatsCards />
        <UrbanPlanningThematicOverview />
        <UrbanPlanningCharts />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <UrbanPlanningProgramTable />
          </div>
          <div>
            <UrbanPlanningIndicatorsPanel />
          </div>
        </div>
      </main>
    </div>
  )
}
