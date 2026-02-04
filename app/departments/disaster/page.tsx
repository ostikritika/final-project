"use client";

import { disasterPrograms } from "@/lib/disaster";

// Dashboard components
import { DashboardHeader } from "@/components/disaster-dashboard/header";
import { DisasterStatsCards } from "@/components/disaster-dashboard/stats-cards";
import { ThematicOverviewDisaster } from "@/components/disaster-dashboard/thematic-overview";
import { LinkageScale } from "@/components/disaster-dashboard/linkage-scale";
import { ProjectPhase } from "@/components/disaster-dashboard/project-phase";
import { ProgramTable } from "@/components/disaster-dashboard/program-tables";
import { IndicatorsPanel } from "@/components/disaster-dashboard/indicators-panel";

// Charts
import {
  ThematicDistributionChart,
  PhaseDistributionChart,
  LinkageScoreChart,
} from "@/components/disaster-dashboard/charts";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DisasterDepartmentPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <DisasterStatsCards programs={disasterPrograms} />
        <ThematicOverviewDisaster programs={disasterPrograms} />

        <Tabs defaultValue="programs" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="indicators">Indicators</TabsTrigger>
            <TabsTrigger value="scales">Scales & Tools</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="programs">
            <ProgramTable programs={disasterPrograms} />
          </TabsContent>

          <TabsContent value="indicators">
            <IndicatorsPanel programs={disasterPrograms} />
          </TabsContent>

          <TabsContent value="scales">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LinkageScale programs={disasterPrograms} />
              <ProjectPhase programs={disasterPrograms} />
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ThematicDistributionChart />
              <PhaseDistributionChart />
              <LinkageScoreChart />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
