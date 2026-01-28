"use client"

import Link from "next/link"
import { ArrowLeft, Building2, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function UrbanPlanningHeader() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Departments
              </Button>
            </Link>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Urban Planning Commission</h1>
                <p className="text-sm text-muted-foreground">सहरी योजना आयोग - Kathmandu Metropolitan City</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>FY 2081/82</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>Kathmandu</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
