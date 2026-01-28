"use client"

import Link from "next/link"
import { Globe, FileText, BarChart3, ArrowLeft, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function DashboardHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-4">
          <Button variant="ghost" size="sm" asChild className="gap-2 text-muted-foreground hover:text-foreground">
            <Link href="/">
              <ArrowLeft className="w-4 h-4" />
              Back to Departments
            </Link>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-rose-100 text-rose-600">
              <Heart className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">काठमाडौं महानगरपालिका</p>
              <h1 className="text-2xl font-bold text-foreground">Health Department | स्वास्थ्य विभाग</h1>
              <p className="text-muted-foreground text-sm">Program Mapping & Evaluation System</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-500" />
              <span>SDG Aligned</span>
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1.5">
              <FileText className="w-3.5 h-3.5 text-green-500" />
              <span>ISO 37120</span>
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-amber-500" />
              <span>SCI 2025</span>
            </Badge>
          </div>
        </div>
      </div>
    </header>
  )
}
