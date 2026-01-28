"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  urbanPlanningPrograms,
  urbanPlanningThematicAreas,
  urbanPlanningProjectPhases,
} from "@/lib/urban-planning-data"
import { Search, Eye, ChevronLeft, ChevronRight } from "lucide-react"
import { UrbanPlanningLinkageScale } from "./linkage-scale"
import { UrbanPlanningProjectPhase } from "./project-phase"

export function UrbanPlanningProgramTable() {
  const [search, setSearch] = useState("")
  const [thematicFilter, setThematicFilter] = useState("all")
  const [phaseFilter, setPhaseFilter] = useState("all")
  const [page, setPage] = useState(1)
  const itemsPerPage = 10

  const filteredPrograms = urbanPlanningPrograms.filter((program) => {
    const matchesSearch =
      program.programName.toLowerCase().includes(search.toLowerCase()) || program.id.includes(search)
    const matchesThematic = thematicFilter === "all" || program.thematicArea === thematicFilter
    const matchesPhase = phaseFilter === "all" || program.projectPhase.phase === phaseFilter
    return matchesSearch && matchesThematic && matchesPhase
  })

  const totalPages = Math.ceil(filteredPrograms.length / itemsPerPage)
  const paginatedPrograms = filteredPrograms.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  const getThematicAreaColor = (areaId: string) => {
    return urbanPlanningThematicAreas.find((a) => a.id === areaId)?.color || "#666"
  }

  const getThematicAreaName = (areaId: string) => {
    return urbanPlanningThematicAreas.find((a) => a.id === areaId)?.name || areaId
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg">Program Registry</CardTitle>
        <p className="text-sm text-muted-foreground">कार्यक्रम दर्ता - {filteredPrograms.length} programs</p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search programs..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              className="pl-9"
            />
          </div>
          <Select
            value={thematicFilter}
            onValueChange={(v) => {
              setThematicFilter(v)
              setPage(1)
            }}
          >
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Thematic Area" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Areas</SelectItem>
              {urbanPlanningThematicAreas.map((area) => (
                <SelectItem key={area.id} value={area.id}>
                  {area.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={phaseFilter}
            onValueChange={(v) => {
              setPhaseFilter(v)
              setPage(1)
            }}
          >
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Phase" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Phases</SelectItem>
              {urbanPlanningProjectPhases.map((phase) => (
                <SelectItem key={phase.value} value={phase.value}>
                  {phase.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">ID</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Program Name</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Thematic Area</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Budget</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Phase</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPrograms.map((program) => (
                <tr key={program.id} className="border-b border-border/50 hover:bg-muted/50">
                  <td className="py-3 px-2 font-mono text-xs">{program.id}</td>
                  <td className="py-3 px-2 max-w-xs">
                    <p className="truncate text-foreground">{program.programName}</p>
                  </td>
                  <td className="py-3 px-2">
                    <Badge
                      variant="outline"
                      style={{
                        borderColor: getThematicAreaColor(program.thematicArea),
                        color: getThematicAreaColor(program.thematicArea),
                      }}
                    >
                      {getThematicAreaName(program.thematicArea)}
                    </Badge>
                  </td>
                  <td className="py-3 px-2 font-medium">NPR {program.budget.toLocaleString()}K</td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: `${program.projectPhase.progress}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{program.projectPhase.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-lg">Program Details</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Program Name</p>
                            <p className="text-foreground">{program.programName}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Department</p>
                              <p className="text-foreground">{program.department}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Budget Code</p>
                              <p className="text-foreground">{program.budgetCode}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Category</p>
                              <Badge variant={program.category === "स्वर्णीम" ? "default" : "outline"}>
                                {program.category}
                              </Badge>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Budget</p>
                              <p className="text-foreground font-semibold">NPR {program.budget.toLocaleString()}K</p>
                            </div>
                          </div>
                          <div className="border-t pt-4">
                            <p className="text-sm font-medium text-muted-foreground mb-2">Linkage Scores (0-5 Scale)</p>
                            <UrbanPlanningLinkageScale scores={program.linkageScores} />
                          </div>
                          <div className="border-t pt-4">
                            <p className="text-sm font-medium text-muted-foreground mb-2">Project Phase</p>
                            <UrbanPlanningProjectPhase phase={program.projectPhase} />
                          </div>
                          <div className="border-t pt-4 space-y-3">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">SDG Mapping</p>
                              <p className="text-xs">
                                <strong>Direct:</strong> {program.sdg.direct || "None"}
                              </p>
                              <p className="text-xs">
                                <strong>Indirect:</strong> {program.sdg.indirect || "None"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">ISO 37120 Mapping</p>
                              <p className="text-xs">
                                <strong>Direct:</strong> {program.iso37120.direct || "None"}
                              </p>
                              <p className="text-xs">
                                <strong>Indirect:</strong> {program.iso37120.indirect || "None"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">SCI 2025 Mapping</p>
                              <p className="text-xs">
                                <strong>Direct:</strong> {program.sci2025.direct || "None"}
                              </p>
                              <p className="text-xs">
                                <strong>Indirect:</strong> {program.sci2025.indirect || "None"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            Showing {(page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, filteredPrograms.length)} of{" "}
            {filteredPrograms.length}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
