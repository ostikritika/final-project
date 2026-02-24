"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  wardEducationData,
  calculateEducationComparison,
  EDUCATION_STANDARD,
} from "@/lib/educationComparision"

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

export default function EducationComparisionPage() {
  const [showEducation, setShowEducation] = useState(false)

  const results = calculateEducationComparison(wardEducationData)
  const cumulativeData = results.map((ward) => ({
    name: `Ward ${ward.wardNumber}`,
    value: ward.str,
  }))

  return (
    <div className="p-6 space-y-8">
      {/* Buttons */}
      <div className="flex gap-4">
        <button
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          onClick={() => setShowEducation(!showEducation)}
        >
          {showEducation ? "Hide Education Comparison" : "Show Education Comparison"}
        </button>

        <Link href="/departments/comparision">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Show Health Comparison
          </button>
        </Link>
      </div>

      <Link href="/">
        <button className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
          ← Back to Dashboard
        </button>
      </Link>

      {/* Education Comparison Section */}
      {showEducation && (
        <div className="mt-6 space-y-8">
          <h1 className="text-3xl font-bold mb-2">Student-Teacher Ratio Assessment</h1>
          <p className="text-sm text-gray-600 mb-6">
            Education Standard → Maximum STR: {EDUCATION_STANDARD.minimum} | Target STR: {EDUCATION_STANDARD.target}
          </p>

          {/* Ward Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((ward) => (
              <Card key={ward.wardNumber} className="hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-center">{`Ward ${ward.wardNumber}`}</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Ward Pie Chart */}
                  <div className="w-full h-48">
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Students per Teacher", value: ward.str },
                            { name: "Remaining", value: Math.max(EDUCATION_STANDARD.minimum - ward.str, 0) },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={70}
                          dataKey="value"
                        >
                          <Cell fill="#3b82f6" />
                          <Cell fill="#f97316" />
                        </Pie>
                        <Tooltip formatter={(value) => `${value} students/teacher`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <p className="text-center font-semibold mt-2">{`STR: ${ward.str}`}</p>
                  <p className="text-sm text-gray-700">{`Students: ${ward.students}`}</p>
                  <p className="text-sm text-gray-700">{`Teachers: ${ward.teachers}`}</p>
                  <p className="text-sm text-gray-700">
                    Above minimum by <strong className="text-red-600">{ward.minimumGap}</strong>
                  </p>
                  <p className="text-sm text-gray-700">
                    Above target by <strong className="text-red-600">{ward.targetGap}</strong>
                  </p>
                  <p className="text-sm">
                    Status: <strong className={ward.status === "Above Minimum" ? "text-red-600" : "text-green-600"}>{ward.status}</strong>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Cumulative Pie Chart */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4 text-center">STR Across All Wards</h2>
            <div className="w-full h-64">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={cumulativeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90}>
                    {cumulativeData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} stroke="#fff" strokeWidth={1} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value} students/teacher`} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center mt-4 gap-2">
              {cumulativeData.map((ward, index) => (
                <div key={index} className="flex items-center gap-1">
                  <span className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                  <span className="text-sm">{ward.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}