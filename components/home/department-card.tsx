import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, FolderKanban } from "lucide-react"
import type { Department } from "@/lib/departments-data"

interface DepartmentCardProps {
  department: Department
}

export function DepartmentCard({ department }: DepartmentCardProps) {
  const Icon = department.icon

  const statusColors = {
    active: "bg-green-100 text-green-700 border-green-200",
    inactive: "bg-blue-100 text-blue-700 border-blue-200",
  }

  return (
    <Link href={department.href} className="block group">
      <Card
        className={`h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 ${department.borderColor} hover:border-primary/50`}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className={`p-3 rounded-xl ${department.bgColor}`}>
              <Icon className={`h-6 w-6 ${department.color}`} />
            </div>
  <Badge
  variant="outline"
  className={
    department.status === "active"
      ? "bg-green-800 text-white border-green-900"  // Dark green
      : "bg-red-800 text-white border-red-900"      // Dark red
  }
>
  {department.status === "active" ? "Active" : "Inactive"}
</Badge>



          </div>
        </CardHeader>

        <CardContent className="space-y-2">
          <div>
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {department.name}
            </h3>
            <p className="text-sm text-muted-foreground font-medium">{department.nameNepali}</p>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{department.description}</p>
        </CardContent>

        <CardFooter className="pt-3 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <FolderKanban className="h-4 w-4" />
              {department.programs} Programs
            </span>
          </div>
          <div className="flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-sm font-medium">View</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
