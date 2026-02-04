"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  disasterPrograms,
  disasterThematicAreas,
  type KMCProgram,
} from "@/lib/disaster"

import { LinkageScale } from "./linkage-scale"
import { ProjectPhase } from "./project-phase"

import {
  Search,
  Filter,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const ITEMS_PER_PAGE = 10

export function ProgramTable() {
  const [search, setSearch] = useState("")
  const [thematicFilter, setThematicFilter] = useState("all")
  const [phaseFilter, setPhaseFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProgram, setSelectedProgram] =
    useState<KMCProgram | null>(null)

  const filteredPrograms = disasterPrograms.filter((program) => {
    const matchesSearch =
      program.programName.toLowerCase().includes(search.toLowerCase()) ||
      program.mainProgram.toLowerCase().includes(search.toLowerCase())

    const matchesThematic =
      thematicFilter === "all" ||
      program.thematicArea === thematicFilter

    const matchesPhase =
      phaseFilter === "all" ||
      program.projectPhase.phase === phaseFilter

    return matchesSearch && matchesThematic && matchesPhase
  })

  const totalPages = Math.ceil(filteredPrograms.length / ITEMS_PER_PAGE)
  const paginatedPrograms = filteredPrograms.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const getThematicColor = (id?: string) => {
    const area = disasterThematicAreas.find((a) => a.id === id)
    return area?.color || "#6B7280"
  }

  const getThematicName = (id?: string) => {
    const area = disasterThematicAreas.find((a) => a.id === id)
    return area?.name || id
  }

  const getPhaseColor = (phase: string) => {
    const colors: Record<string, string> = {
      planning: "bg-gray-100 text-gray-700",
      preparedness: "bg-blue-100 text-blue-700",
      response: "bg-amber-100 text-amber-700",
      recovery: "bg-green-100 text-green-700",
    }
    return colors[phase] || "bg-gray-100 text-gray-700"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          <div>
            <CardTitle>
              Disaster Programs Registry / विपद् कार्यक्रम दर्ता
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {filteredPrograms.length} programs found
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search programs..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-9 w-64"
              />
            </div>

            {/* Thematic Filter */}
            <Select
              value={thematicFilter}
              onValueChange={(v) => {
                setThematicFilter(v)
                setCurrentPage(1)
              }}
            >
              <SelectTrigger className="w-44">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Thematic Area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Areas</SelectItem>
                {disasterThematicAreas.map((area) => (
                  <SelectItem key={area.id} value={area.id}>
                    {area.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Phase Filter */}
            <Select
              value={phaseFilter}
              onValueChange={(v) => {
                setPhaseFilter(v)
                setCurrentPage(1)
              }}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Phase" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Phases</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="preparedness">Preparedness</SelectItem>
                <SelectItem value="response">Response</SelectItem>
                <SelectItem value="recovery">Recovery</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Thematic</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Scores</TableHead>
              <TableHead>Phase</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedPrograms.map((program) => (
              <TableRow key={program.id}>
                <TableCell className="font-mono text-xs">
                  {program.id}
                </TableCell>

                <TableCell>
                  <p className="font-medium">{program.programName}</p>
                  <p className="text-xs text-muted-foreground">
                    {program.mainProgram}
                  </p>
                </TableCell>

                <TableCell>
                  <Badge
                    variant="outline"
                    style={{
                      borderColor: getThematicColor(program.thematicArea),
                      color: getThematicColor(program.thematicArea),
                    }}
                  >
                    {getThematicName(program.thematicArea)}
                  </Badge>
                </TableCell>

                <TableCell className="font-mono text-xs">
                  रु. {program.budget.toLocaleString()}
                </TableCell>

                <TableCell>
                  <div className="flex gap-1">
                    <span className="w-6 h-6 flex items-center justify-center rounded bg-blue-100 text-blue-700 text-xs">
                      {program.linkageScores.sdgScore}
                    </span>
                    <span className="w-6 h-6 flex items-center justify-center rounded bg-green-100 text-green-700 text-xs">
                      {program.linkageScores.isoScore}
                    </span>
                    <span className="w-6 h-6 flex items-center justify-center rounded bg-amber-100 text-amber-700 text-xs">
                      {program.linkageScores.sciScore}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge className={getPhaseColor(program.projectPhase.phase)}>
                    {program.projectPhase.phase}
                  </Badge>
                </TableCell>

                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedProgram(program)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Program Details</DialogTitle>
                      </DialogHeader>

                      {selectedProgram && (
                        <div className="space-y-6">
                          <LinkageScale
                            sdgScore={selectedProgram.linkageScores.sdgScore}
                            isoScore={selectedProgram.linkageScores.isoScore}
                            sciScore={selectedProgram.linkageScores.sciScore}
                            linkageType={
                              selectedProgram.linkageScores.linkageType
                            }
                          />

                          <ProjectPhase
                            phase={selectedProgram.projectPhase.phase}
                            progress={
                              selectedProgram.projectPhase.progress ?? 0
                            }
                          />
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
