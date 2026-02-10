"use client"

import Link from "next/link"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Button } from "@/components/ui/button"

const budgetData = [
  { name: "कृषि तथा पशु पंक्षि विभाग", value: 263020 },
  { name: "कानुन तथा मानव अधिकार विभाग", value: 78600 },
  { name: "प्रशासन विभाग", value: 792730 },
  { name: "राजश्व विभाग", value: 106100 },
  { name: "वातावरण व्यवस्थापन विभाग", value: 1344970 },
  { name: "वित्त विभाग", value: 31560 },
  { name: "विपद व्यवस्थापन विभाग", value: 15820 },
  { name: "शिक्षा विभाग", value: 1049098 },
  { name: "सम्पदा तथा पर्यटन विभाग", value: 631338 },
  { name: "सहकारी विभाग", value: 117950 },
  { name: "सहरी व्यवस्थापन विभाग", value: 402100 },
  { name: "सामाजिक विकास विभाग", value: 2355403 },
  { name: "सार्वजनिक निर्माण विभाग", value: 10850156 },
  { name: "सूचना प्रविधि विभाग", value: 172500 },
  { name: "स्वास्थ्य विभाग", value: 706497 },
  { name: "हरियाली प्रवर्धन आयोजना", value: 54500 },
]

const COLORS = [
  "#2563eb", "#16a34a", "#f59e0b", "#dc2626",
  "#7c3aed", "#0ea5e9", "#22c55e", "#e11d48",
  "#9333ea", "#14b8a6", "#f97316", "#84cc16",
  "#3b82f6", "#ec4899", "#10b981", "#a855f7",
]

export default function BudgetAllocationPage() {
  return (
    <div className="p-8 space-y-6">

      {/* Header */}
      <div className="relative flex items-center justify-center">
        <h1 className="text-3xl font-bold">Budget Allocation</h1>
        <Link href="/" className="absolute right-0">
          <Button variant="outline">← Back to Dashboard</Button>
        </Link>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">

        {/* Pie Chart (LEFT) */}
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={budgetData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
              >
                {budgetData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value: number, name: string) => [
                  `NPR ${value.toLocaleString()}`,
                  name,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Program List (RIGHT) */}
        <div className="space-y-2">
          {budgetData.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <span
                className="mt-1 w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <div className="text-sm leading-tight">
                <p className="font-medium">{item.name}</p>
                <p className="text-muted-foreground">
                  NPR {item.value.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
