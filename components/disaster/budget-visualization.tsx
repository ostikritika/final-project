"use client"

import BudgetPieChart from "./budget-pie-chart"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { disasterPrograms } from "@/lib/disaster-data"

export default function BudgetVisualization() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <BudgetPieChart
          data={disasterPrograms.map(p => ({
            programName: p.programName,
            budget: p.budget,
          }))}
        />
      </CardContent>
    </Card>
  )
}
