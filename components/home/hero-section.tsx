"use client"

import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, DollarSign } from "lucide-react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative bg-linear-to-br from-primary/5 via-background to-primary/10 border-b border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col items-center text-center space-y-6">
          
          {/* Logo and Badge */}
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-full">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <Badge variant="secondary" className="text-sm py-1 px-3">
              <MapPin className="h-3.5 w-3.5 mr-1.5" />
              Nepal
            </Badge>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
              Kathmandu Metropolitan City
            </h1>
            <p className="text-xl md:text-2xl font-semibold text-primary">काठमाडौं महानगरपालिका</p>
          </div>

          {/* Subtitle */}
          <p className="text-muted-foreground max-w-2xl text-lg">
            Program Mapping and Evaluation System aligned with SDG, ISO 37120, and Smart City Index (SCI) 2025 Standards
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 pt-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">16</p>
              <p className="text-sm text-muted-foreground">Departments</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">1000+</p>
              <p className="text-sm text-muted-foreground">Programs</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">32</p>
              <p className="text-sm text-muted-foreground">Wards</p>
            </div>
            <div className="text-center">

              <p className="text-3xl font-bold text-foreground">NPR 25,764,341,000</p>
              <p className="text-sm text-muted-foreground">Annual Budget(~26 Arab)</p>

             {/* <p className="text-3xl font-bold text-foreground">NPR 25,764,341,000 (~26 Arab)</p>
                <p className="text-sm text-muted-foreground">Annual Budget</p> */}
            </div>
          </div>

          <Link href="/departments/budget-allocation">
            <Card className="mt-6 w-64 cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="flex items-center justify-center gap-2">
              {/* <DollarSign className="h-5 w-5 text-primary" /> */}
              <CardTitle>Budget Allocation Of Individual Department </CardTitle>
            </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  )
}
