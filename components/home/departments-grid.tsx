import { DepartmentCard } from "./department-card"
import { departments } from "@/lib/departments-data"

export function DepartmentsGrid() {
  return (
    <section className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">Municipal Departments</h2>
        <p className="text-muted-foreground mt-1">Select a department to view program mapping and evaluation details</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {departments.map((department) => (
          <DepartmentCard key={department.id} department={department} />
        ))}
      </div>
    </section>
  )
}
