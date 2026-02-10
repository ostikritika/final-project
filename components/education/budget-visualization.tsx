"use client"

import BudgetPieChart from "./budget-pie-chart"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { educationPrograms } from "@/lib/education-data"

export default function BudgetVisualization() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <BudgetPieChart
          data={educationPrograms.map(p => ({
            programName: p.programName,
            budget: p.budget,
          }))}
        />
      </CardContent>
    </Card>
  )
}
