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

import { disasterPrograms, disasterThematicAreas, KMCProgram } from "@/lib/disaster"

import { Search, Filter, Eye, ChevronLeft, ChevronRight } from "lucide-react"

const ITEMS_PER_PAGE = 10

export function ProgramTable() {
  const [search, setSearch] = useState("")
  const [thematicFilter, setThematicFilter] = useState("all")
  const [phaseFilter, setPhaseFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  // ---------------- COUNT STANDARDS ----------------
  const sdgCount: Record<string, number> = {}
  const isoCount: Record<string, number> = {}
  const sciCount: Record<string, number> = {}

  disasterPrograms.forEach((p) => {
    if (p.sdg?.direct && p.sdg.direct !== "No") {
      sdgCount[p.sdg.direct] = (sdgCount[p.sdg.direct] || 0) + 1
    }
    if (p.iso37120?.direct && p.iso37120.direct !== "No") {
      isoCount[p.iso37120.direct] = (isoCount[p.iso37120.direct] || 0) + 1
    }
    if (p.sci2025?.direct && p.sci2025.direct !== "No") {
      sciCount[p.sci2025.direct] = (sciCount[p.sci2025.direct] || 0) + 1
    }
  })
  // ------------------------------------------------

  const filteredPrograms = disasterPrograms.filter((program) => {
    const matchesSearch =
      program.programName.toLowerCase().includes(search.toLowerCase()) ||
      program.mainProgram.toLowerCase().includes(search.toLowerCase())

    const matchesThematic =
      thematicFilter === "all" || program.thematicArea === thematicFilter

    const matchesPhase =
      phaseFilter === "all" || program.projectPhase.phase === phaseFilter

    return matchesSearch && matchesThematic && matchesPhase
  })

  const totalPages = Math.ceil(filteredPrograms.length / ITEMS_PER_PAGE)
  const paginatedPrograms = filteredPrograms.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const getThematicName = (id?: string) =>
    disasterThematicAreas.find((a) => a.id === id)?.name || id

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

          <div className="flex flex-wrap gap-3">
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

            {/* Count Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Count of Standards</Button>
              </DialogTrigger>

              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Standards Coverage</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 text-sm">
                  <div>
                    <h3 className="font-semibold mb-2">SDG</h3>
                    {Object.entries(sdgCount).map(([k, v]) => (
                      <p key={k}>SDG {k} → {v} programs</p>
                    ))}
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">ISO 37120</h3>
                    {Object.entries(isoCount).map(([k, v]) => (
                      <p key={k}>ISO {k} → {v} programs</p>
                    ))}
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">SCI 2025</h3>
                    {Object.entries(sciCount).map(([k, v]) => (
                      <p key={k}>{k} → {v} programs</p>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* ✅ TABLE RESTORED */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Program Name</TableHead>
              <TableHead>Thematic Area</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Standards</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedPrograms.map((program) => (
              <TableRow key={program.id}>
                <TableCell className="font-medium">
                  {program.programName}
                </TableCell>

                <TableCell>
                  {getThematicName(program.thematicArea)}
                </TableCell>

                <TableCell>
                  Rs {program.budget.toLocaleString()}
                </TableCell>

                {/* SDG + ISO only (clean colors) */}
                <TableCell className="space-x-2">
                  {program.sdg.direct !== "No" && (
                    <Badge className="bg-blue-100 text-blue-700">
                      SDG {program.sdg.direct}
                    </Badge>
                  )}
                  {program.iso37120.direct !== "No" && (
                    <Badge className="bg-emerald-100 text-emerald-700">
                      ISO {program.iso37120.direct}
                    </Badge>
                  )}
                </TableCell>

                {/* ACTION FIXED */}
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-xl">
                      <DialogHeader>
                        <DialogTitle>Program Details</DialogTitle>
                      </DialogHeader>

                      <div className="space-y-3 text-sm">
                        <p className="font-semibold">
                          {program.programName}
                        </p>
                        <p>Main Program: {program.mainProgram}</p>
                        <p>Budget: Rs {program.budget.toLocaleString()}</p>
                        <p>Thematic Area: {getThematicName(program.thematicArea)}</p>

                        <div className="flex gap-2 pt-2">
                          {program.sdg.direct !== "No" && (
                            <Badge className="bg-blue-100 text-blue-700">
                              SDG {program.sdg.direct}
                            </Badge>
                          )}
                          {program.iso37120.direct !== "No" && (
                            <Badge className="bg-emerald-100 text-emerald-700">
                              ISO {program.iso37120.direct}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* PAGINATION */}
        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
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
