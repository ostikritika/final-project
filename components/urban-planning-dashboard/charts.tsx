"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  getUrbanPlanningThematicAreaStats,
  urbanPlanningPrograms,
  urbanPlanningProjectPhases,
} from "@/lib/urban-planning-data"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

export function UrbanPlanningCharts() {
  const thematicStats = getUrbanPlanningThematicAreaStats()

  const budgetData = thematicStats.map((area) => ({
    name: area.name.split(" ")[0],
    budget: area.totalBudget / 1000,
    programs: area.programCount,
  }))

  const phaseData = urbanPlanningProjectPhases.map((phase) => ({
    name: phase.label,
    count: urbanPlanningPrograms.filter((p) => p.projectPhase.phase === phase.value).length,
    color:
      phase.value === "inception"
        ? "#64748b"
        : phase.value === "approval"
          ? "#f59e0b"
          : phase.value === "tender"
            ? "#3b82f6"
            : phase.value === "award"
              ? "#06b6d4"
              : "#10b981",
  }))

  const alignmentData = thematicStats.map((area) => ({
    area: area.name.split(" ")[0],
    SDG: area.avgSdgScore,
    ISO: area.avgIsoScore,
    SCI: area.avgSciScore,
  }))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg">Budget by Thematic Area</CardTitle>
          <p className="text-sm text-muted-foreground">विषयगत क्षेत्र अनुसार बजेट (NPR Million)</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="name" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="budget" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg">Programs by Phase</CardTitle>
          <p className="text-sm text-muted-foreground">चरण अनुसार कार्यक्रम</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={phaseData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="count"
                label={({ name, count }) => `${name}: ${count}`}
              >
                {phaseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-border lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Standard Alignment by Thematic Area</CardTitle>
          <p className="text-sm text-muted-foreground">विषयगत क्षेत्र अनुसार मानक सम्बद्धता (0-5 Scale)</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={alignmentData}>
              <PolarGrid className="stroke-muted" />
              <PolarAngleAxis dataKey="area" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <Radar name="SDG" dataKey="SDG" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
              <Radar name="ISO 37120" dataKey="ISO" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
              <Radar name="SCI 2025" dataKey="SCI" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
              <Legend />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
