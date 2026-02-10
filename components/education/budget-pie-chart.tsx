"use client"

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { getBudgetColor } from "@/lib/budget-utils"

interface BudgetPieChartProps {
  data: { programName: string; budget: number }[]
}

export default function BudgetPieChart({ data }: BudgetPieChartProps) {
  // Combine programs with the same budget
  const budgetMap = new Map<number, string[]>()
  data.forEach(p => {
    if (!budgetMap.has(p.budget)) budgetMap.set(p.budget, [])
    budgetMap.get(p.budget)!.push(p.programName)
  })

  const chartData = Array.from(budgetMap.entries()).map(([budget, programs]) => ({
    value: budget,
    programs,             // array of program names
    color: getBudgetColor(budget),
  }))

  return (
    <div className="space-y-6">
      {/* Pie chart */}
      <div style={{ height: 400, width: "100%" }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="value"   // dummy, not used in tooltip
              outerRadius="90%"
              label={false}     // no labels inside pie
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string, props: any) => {
                // access programs array from payload
                const programs = props.payload.programs as string[]
                return [`${value} NPR`, programs.join(", ")]
              }}
              contentStyle={{ fontSize: 12 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Full program list below chart */}
      <div className="mt-4 border-t pt-4 max-h-64 overflow-y-auto text-sm">
        {chartData.map((entry, idx) => (
          <div key={idx} className="flex items-center mb-1">
            <div
              className="w-4 h-4 mr-2 rounded"
              style={{ backgroundColor: entry.color }}
            />
            <div>
              <strong>{entry.value} NPR:</strong> {entry.programs.join(", ")}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
