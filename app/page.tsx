import { HeroSection } from "@/components/home/hero-section"
import { DepartmentsGrid } from "@/components/home/departments-grid"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <DepartmentsGrid />

      {/* Footer */}
      <footer className="border-t border-border mt-8 py-6 bg-card">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 Kathmandu Metropolitan City | काठमाडौं महानगरपालिका</p>
          <p className="mt-1">Program Mapping System - Aligned with SDG, ISO 37120, and SCI 2025</p>
        </div>
      </footer>
    </div>
  )
}
