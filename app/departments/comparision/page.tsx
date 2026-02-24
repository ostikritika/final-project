"use client"

import React from "react"
import Link from "next/link"
import {
  wardHealthData,
  calculateHealthComparison,
  SCI_HEALTH_STANDARD,
} from "@/lib/comparison"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

const COLORS = [
  "#16a34a", "#dc2626", "#3b82f6", "#f59e0b", "#8b5cf6",
  "#f97316", "#10b981", "#ef4444", "#6366f1", "#facc15",
  "#22d3ee", "#e11d48", "#a78bfa", "#f43f5e", "#84cc16",
  "#f97316", "#06b6d4", "#be123c", "#818cf8", "#fde68a",
  "#4ade80", "#f87171", "#60a5fa", "#fcd34d", "#34d399",
  "#fca5a5", "#93c5fd", "#fde68a", "#a3e635", "#f87171",
  "#60a5fa", "#fbbf24"
]

export default function HealthComparisionPage() {
  const results = calculateHealthComparison(wardHealthData)
  const cumulativeData = results.map((ward) => ({
    name: `Ward ${ward.wardNumber}`,
    value: ward.insuredPopulation,
  }))

  return (
    <div className="p-6 space-y-8">
      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <Link href="/departments/comparision">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Show Health Comparison
          </button>
        </Link>

        <Link href="/departments/educationComparision">
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
            Show Education Comparison
          </button>
        </Link>
      </div>

      <Link href="/">
        <button className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
          ← Back to Dashboard
        </button>
      </Link>

      {/* Health Comparison Section */}
      <div className="mt-6 space-y-8">
        <h1 className="text-3xl font-bold mb-2">Health Insurance Coverage Assessment</h1>
        <p className="text-sm text-gray-600 mb-6">
          SCI Benchmark → Minimum: {SCI_HEALTH_STANDARD.minimum}% | Target: {SCI_HEALTH_STANDARD.target}%
        </p>

        {/* Ward Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((ward) => (
            <Card key={ward.wardNumber} className="hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-center">{`Ward ${ward.wardNumber}`}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-48">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Insured", value: ward.percentage },
                          { name: "Uninsured", value: 100 - ward.percentage },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        dataKey="value"
                      >
                        <Cell fill="#16a34a" />
                        <Cell fill="#dc2626" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <p className="text-center font-semibold mt-2">{`Coverage: ${ward.percentage}%`}</p>
                <p className="text-sm text-gray-700">{`Total population: ${ward.population}`}</p>
                <p className="text-sm text-gray-700">{`Insured: ${ward.insuredPopulation}`}</p>
                <p className="text-sm text-gray-700">
                  Below minimum by <strong className="text-red-600">{ward.minimumGap}%</strong>
                </p>
                <p className="text-sm text-gray-700">
                  Below target by <strong className="text-red-600">{ward.targetGap}%</strong>
                </p>
                <p className="text-sm">
                  Status:{" "}
                  <strong className={ward.status === "Below Minimum" ? "text-red-600" : "text-green-600"}>
                    {ward.status}
                  </strong>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cumulative Pie Chart */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-center">Total Insured Population Across Wards</h2>
          <div className="w-full h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={cumulativeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90}>
                  {cumulativeData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} stroke="#fff" strokeWidth={1} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} people`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}