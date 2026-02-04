"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { thematicAreas, projectPhases } from "@/lib/kmc-data";
import { disasterPrograms } from "@/lib/disaster";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function ThematicDistributionChart() {
  const data = thematicAreas
    .map((area) => ({
      name: area.name,
      value: disasterPrograms.filter(
        (p) => p.thematicArea === area.id
      ).length,
      color: area.color,
    }))
    .filter((d) => d.value > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Disaster Programs by Thematic Area</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" outerRadius={90} label>
              {data.map((d, i) => (
                <Cell key={i} fill={d.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function PhaseDistributionChart() {
  const data = projectPhases.map((phase) => ({
    name: phase.label,
    count: disasterPrograms.filter(
      (p) => p.projectPhase.phase === phase.value
    ).length,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Programs by Phase</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function LinkageScoreChart() {
  const avg = (key: "sdgScore" | "isoScore" | "sciScore") =>
    disasterPrograms.reduce((s, p) => s + p.linkageScores[key], 0) /
    disasterPrograms.length;

  const data = [
    { name: "SDG", value: avg("sdgScore") },
    { name: "ISO 37120", value: avg("isoScore") },
    { name: "SCI 2025", value: avg("sciScore") },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Average Linkage Scores</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <XAxis type="number" domain={[0, 5]} />
            <YAxis type="category" dataKey="name" />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
