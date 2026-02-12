"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

// ✅ Fixed import: use 'educationPrograms' instead of 'educationData'
import { DisasterDepartment, disasterPrograms, thematicAreas } from "@/lib/disaster-data"
import { LinkageScale } from "./linkage-scale"
import { ProjectPhase } from "./project-phase"
import { Search, Filter, Eye, ChevronLeft, ChevronRight } from "lucide-react"
type EducationProgram = typeof disasterPrograms[number]

const ITEMS_PER_PAGE = 10
export interface ProgramTableProps {
  programs: DisasterDepartment[];
  department?: string;
}
  
export function ProgramTable({ programs, department }: ProgramTableProps) {
  const [search, setSearch] = useState("")
  const [thematicFilter, setThematicFilter] = useState<string>("all")
  const [phaseFilter, setPhaseFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProgram, setSelectedProgram] = useState<DisasterDepartment | null>(null)

  // ✅ Use 'disasterPrograms' instead of 'educationPrograms'
  const filteredPrograms = disasterPrograms.filter((program: DisasterDepartment) => {
    const matchesSearch =
      program.programName.toLowerCase().includes(search.toLowerCase()) ||
      program.mainProgram.toLowerCase().includes(search.toLowerCase())
    const matchesThematic = thematicFilter === "all" || program.thematicArea === thematicFilter
    const matchesPhase = phaseFilter === "all" || program.projectPhase.phase === phaseFilter

    return matchesSearch && matchesThematic && matchesPhase
  })

  const totalPages = Math.ceil(filteredPrograms.length / ITEMS_PER_PAGE)
  const paginatedPrograms = filteredPrograms.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )
  
  // ...rest of your component remains unchanged

  const getThematicColor = (id: string) => {
    const area = thematicAreas.find((a) => a.id === id)
    return area?.color || "#6B7280"
  }

  const getThematicName = (id: string) => {
    const area = thematicAreas.find((a) => a.id === id)
    return area?.name || id
  }

  const getPhaseColor = (phase: string) => {
    const colors: Record<string, string> = {
      inception: "bg-gray-100 text-gray-700",
      approval: "bg-blue-100 text-blue-700",
      tender: "bg-amber-100 text-amber-700",
      award: "bg-purple-100 text-purple-700",
      completion: "bg-green-100 text-green-700",
    }
    return colors[phase] || "bg-gray-100 text-gray-700"
  }

  return (
    <Card className="border border-border">
      <CardHeader className="pb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-lg font-semibold text-foreground">Program Registry / कार्यक्रम दर्ता</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{filteredPrograms.length} programs found</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search programs..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-9 w-full sm:w-64"
              />
            </div>

            <Select
              value={thematicFilter}
              onValueChange={(v) => {
                setThematicFilter(v)
                setCurrentPage(1)
              }}
            >
              <SelectTrigger className="w-full sm:w-44">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Thematic Area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Areas</SelectItem>
                {thematicAreas.map((area) => (
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
                setCurrentPage(1)
              }}
            >
              <SelectTrigger className="w-full sm:w-36">
                <SelectValue placeholder="Phase" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Phases</SelectItem>
                <SelectItem value="inception">Inception</SelectItem>
                <SelectItem value="approval">Approval</SelectItem>
                <SelectItem value="tender">Tender</SelectItem>
                <SelectItem value="award">Award</SelectItem>
                <SelectItem value="completion">Completion</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">ID</TableHead>
                <TableHead className="min-w-75">Program Name</TableHead>
                <TableHead className="w-32">Thematic</TableHead>
                <TableHead className="w-28">Budget</TableHead>
                <TableHead className="w-36">Linkage (SDG/ISO/SCI)</TableHead>
                <TableHead className="w-32">Phase</TableHead>
                <TableHead className="w-24">Progress</TableHead>
                <TableHead className="w-16">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedPrograms.map((program) => (
                <TableRow key={program.id}>
                  <TableCell className="font-mono text-xs">{program.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm text-foreground line-clamp-2">{program.programName}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{program.mainProgram}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="text-xs"
                      style={{
                        borderColor: getThematicColor(program.thematicArea),
                        color: getThematicColor(program.thematicArea),
                      }}
                    >
                      {getThematicName(program.thematicArea).split(" ")[0]}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs">रु. {program.budget.toLocaleString()}K</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="w-6 h-6 flex items-center justify-center text-xs font-bold rounded bg-blue-100 text-blue-700">
                        {program.linkageScores.sdgScore}
                      </span>
                      <span className="w-6 h-6 flex items-center justify-center text-xs font-bold rounded bg-green-100 text-green-700">
                        {program.linkageScores.isoScore}
                      </span>
                      <span className="w-6 h-6 flex items-center justify-center text-xs font-bold rounded bg-amber-100 text-amber-700">
                        {program.linkageScores.sciScore}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${getPhaseColor(program.projectPhase.phase)}`}>
                      {program.projectPhase.phase}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={program.projectPhase.progress} className="h-2 w-16" />
                      <span className="text-xs font-mono text-muted-foreground">{program.projectPhase.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedProgram(program)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-lg">Program Details / कार्यक्रम विवरण</DialogTitle>
                        </DialogHeader>
                        {selectedProgram && (
                          <div className="space-y-6 pt-4">
                            <div className="space-y-2">
                              <h3 className="font-semibold text-foreground">{selectedProgram.programName}</h3>
                              <div className="flex flex-wrap gap-2">
                                <Badge variant="outline">ID: {selectedProgram.id}</Badge>
                                <Badge variant="outline">Budget: रु. {selectedProgram.budget.toLocaleString()}K</Badge>
                                <Badge
                                  style={{
                                    backgroundColor: `${getThematicColor(selectedProgram.thematicArea)}20`,
                                    color: getThematicColor(selectedProgram.thematicArea),
                                  }}
                                >
                                  {getThematicName(selectedProgram.thematicArea)}
                                </Badge>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-4 p-4 rounded-lg bg-muted/50">
                                <h4 className="font-medium text-foreground">Standard Mappings</h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">SDG:</span>
                                    <span className="font-medium text-foreground">
                                      {selectedProgram.sdg.direct || "N/A"}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">ISO 37120:</span>
                                    <span className="font-medium text-foreground">
                                      {selectedProgram.iso37120.direct || "N/A"}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">SCI 2025:</span>
                                    <span className="font-medium text-foreground text-right max-w-50 truncate">
                                      {selectedProgram.sci2025.direct || "N/A"}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="p-4 rounded-lg bg-muted/50">
                                <LinkageScale
                                  sdgScore={selectedProgram.linkageScores.sdgScore}
                                  isoScore={selectedProgram.linkageScores.isoScore}
                                  sciScore={selectedProgram.linkageScores.sciScore}
                                  linkageType={selectedProgram.linkageScores.linkageType}
                                />
                              </div>
                            </div>

                            <div className="p-4 rounded-lg bg-muted/50">
                              <ProjectPhase
                                phase={selectedProgram.projectPhase.phase}
                                progress={selectedProgram.projectPhase.progress}
                              />
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredPrograms.length)} of {filteredPrograms.length}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm text-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
