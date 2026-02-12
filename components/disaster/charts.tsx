"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { disasterPrograms, thematicAreas, projectPhases } from "@/lib/disaster-data"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function ThematicDistributionChart() {
  const data = thematicAreas
    .map((area) => ({
      name: area.name.split(" ")[0],
      value: disasterPrograms.filter((p) => p.thematicArea === area.id).length,
      color: area.color,
    }))
    .filter((d) => d.value > 0)

  return (
    <Card className="border border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-foreground">Programs by Thematic Area</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function PhaseDistributionChart() {
  const data = projectPhases.map((phase) => ({
    name: phase.label,
    count: disasterPrograms.filter((p) => p.projectPhase.phase === phase.value).length,
  }))

  const colors = ["#9CA3AF", "#3B82F6", "#F59E0B", "#8B5CF6", "#22C55E"]

  return (
    <Card className="border border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-foreground">Programs by Phase</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="name"
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                axisLine={{ stroke: "var(--border)" }}
              />
              <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} axisLine={{ stroke: "var(--border)" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function LinkageScoreChart() {
  const avgSDG = disasterPrograms.reduce((sum, p) => sum + p.linkageScores.sdgScore, 0) / disasterPrograms.length
  const avgISO = disasterPrograms.reduce((sum, p) => sum + p.linkageScores.isoScore, 0) / disasterPrograms.length
  const avgSCI = disasterPrograms.reduce((sum, p) => sum + p.linkageScores.sciScore, 0) / disasterPrograms.length

  const data = [
    { standard: "SDG", score: avgSDG.toFixed(2), fill: "#3B82F6" },
    { standard: "ISO 37120", score: avgISO.toFixed(2), fill: "#22C55E" },
    { standard: "SCI 2025", score: avgSCI.toFixed(2), fill: "#F59E0B" },
  ]

  return (
    <Card className="border border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-foreground">Average Linkage Scores</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                type="number"
                domain={[0, 5]}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                axisLine={{ stroke: "var(--border)" }}
              />
              <YAxis
                type="category"
                dataKey="standard"
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                axisLine={{ stroke: "var(--border)" }}
                width={80}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
