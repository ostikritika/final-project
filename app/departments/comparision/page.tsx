"use client"

import React from "react"
import Link from "next/link"

import {
  wardHealthData,
  calculateHealthComparison,
  SCI_HEALTH_STANDARD,
} from "@/lib/comparison"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const COLORS = ["#16a34a", "#dc2626"] // Green = insured, Red = uninsured

export default function Page() {
  const results = calculateHealthComparison(wardHealthData)

  return (
    <div className="p-6 space-y-8">

      {/* Back to Dashboard Button */}
      <div>
        <Link href="/">
  <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-sm transition">
    ← Back to Dashboard
  </button>
</Link>

      </div>

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Health Insurance Coverage Assessment
        </h1>

        <p className="text-sm text-gray-600 mt-2">
          SCI Benchmark → Minimum Standard: {SCI_HEALTH_STANDARD.minimum}% | 
          Target Benchmark: {SCI_HEALTH_STANDARD.target}%
        </p>
      </div>

      {/* Ward Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((ward) => (
          <Card
            key={ward.wardNumber}
            className="hover:shadow-xl transition-all duration-300"
          >
            <CardHeader>
              <CardTitle className="text-center text-lg font-semibold">
                Ward {ward.wardNumber}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

              {/* Pie Chart */}
              <div className="w-full h-52">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Insured", value: ward.percentage },
                        { name: "Uninsured", value: 100 - ward.percentage },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      dataKey="value"
                    >
                      {COLORS.map((color, index) => (
                        <Cell key={index} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Coverage */}
              <p className="text-center text-lg font-semibold">
                Coverage: {ward.percentage}%
              </p>

              {/* Analytical Statements */}
              <p className="text-sm text-gray-700">
                The ward falls short of the minimum standard by{" "}
                <strong className="text-red-600">
                  {ward.minimumGap > 0 ? ward.minimumGap + "%" : "0%"}
                </strong>.
              </p>

              <p className="text-sm text-gray-700">
                The ward remains{" "}
                <strong className="text-red-600">
                  {ward.targetGap > 0 ? ward.targetGap + "%" : "0%"}
                </strong>{" "}
                below the target benchmark.
              </p>

              {/* Status */}
              <p className="text-sm">
                Status:{" "}
                <strong
                  className={
                    ward.status === "Below Minimum"
                      ? "text-red-600"
                      : "text-green-600"
                  }
                >
                  {ward.status}
                </strong>
              </p>

            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
