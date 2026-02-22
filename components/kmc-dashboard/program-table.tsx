"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { kmcPrograms, thematicAreas, type KMCProgram } from "@/lib/kmc-data"
import { ChevronLeft, ChevronRight, Eye } from "lucide-react"

const ITEMS_PER_PAGE = 10

export function ProgramTable() {
  const [search, setSearch] = useState("")
  const [thematicFilter, setThematicFilter] = useState("all")
  const [phaseFilter, setPhaseFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [showStandardsDetails, setShowStandardsDetails] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState<KMCProgram | null>(null)

  // =========================
  // Filtering
  // =========================

  const filteredPrograms = kmcPrograms.filter((program) => {
    const matchesSearch =
      program.programName.toLowerCase().includes(search.toLowerCase()) ||
      program.mainProgram.toLowerCase().includes(search.toLowerCase())

    const matchesThematic =
      thematicFilter === "all" || program.thematicArea === thematicFilter

    const matchesPhase =
      phaseFilter === "all" || program.projectPhase.phase === phaseFilter

    return matchesSearch && matchesThematic && matchesPhase
  })

  // =========================
  // COUNTING LOGIC
  // =========================

  const countStandards = (programs: KMCProgram[]) => {
    const sdgCount: Record<string, number> = {}
    const isoCount: Record<string, number> = {}
    const sciCount: Record<string, number> = {}

    let sdgPrograms = 0
    let isoPrograms = 0
    let sciPrograms = 0

    // Get all possible codes from programs
    const allSDG: Set<string> = new Set()
    const allISO: Set<string> = new Set()
    const allSCI: Set<string> = new Set()

    programs.forEach((program) => {
      const sdgValues = [program.sdg?.direct, program.sdg?.indirect].filter(Boolean)
      const isoValues = [program.iso37120?.direct, program.iso37120?.indirect].filter(Boolean)
      const sciValues = [program.sci2025?.direct, program.sci2025?.indirect].filter(Boolean)

      sdgValues.forEach((v) => allSDG.add(v!.replace(/[()]/g, "")))
      isoValues.forEach((v) => allISO.add(v!))
      sciValues.forEach((v) => allSCI.add(v!))
    })

    // Count programs
    programs.forEach((program) => {
      // SDG
      let touchedSDG = false
      const sdgValues = [program.sdg?.direct, program.sdg?.indirect]

      sdgValues.forEach((value) => {
        if (value && value !== "No") {
          touchedSDG = true
          const clean = value.replace(/[()]/g, "")
          sdgCount[clean] = (sdgCount[clean] || 0) + 1
        }
      })
      if (touchedSDG) sdgPrograms++

      // ISO
      let touchedISO = false
      const isoValues = [program.iso37120?.direct, program.iso37120?.indirect]

      isoValues.forEach((value) => {
        if (value && value !== "No") {
          touchedISO = true
          isoCount[value] = (isoCount[value] || 0) + 1
        }
      })
      if (touchedISO) isoPrograms++

      // SCI
      let touchedSCI = false
      const sciValues = [program.sci2025?.direct, program.sci2025?.indirect]
      sciValues.forEach((value) => {
        if (value && value !== "No") touchedSCI = true
      })
      if (touchedSCI) sciPrograms++
    })

    // Include untouched codes with count = 0
    allSDG.forEach((code) => { if (!sdgCount[code]) sdgCount[code] = 0 })
    allISO.forEach((code) => { if (!isoCount[code]) isoCount[code] = 0 })
    allSCI.forEach((code) => { if (!sciCount[code]) sciCount[code] = 0 })

    return { sdgCount, isoCount, sciCount, sdgPrograms, isoPrograms, sciPrograms }
  }

  const standards = countStandards(filteredPrograms)

  const sortEntries = (data: Record<string, number>) =>
    Object.entries(data).sort((a, b) => b[1] - a[1]) // descending order

  const totalPages = Math.ceil(filteredPrograms.length / ITEMS_PER_PAGE)

  const paginatedPrograms = filteredPrograms.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Program Registry</CardTitle>

        {/* KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 max-w-md">
          <div className="border rounded-lg p-3">
            <p className="text-xs">Programs touching SDG</p>
            <p className="text-2xl font-bold text-green-600">{standards.sdgPrograms}</p>
          </div>

          <div className="border rounded-lg p-3">
            <p className="text-xs">Programs touching ISO</p>
            <p className="text-2xl font-bold text-blue-600">{standards.isoPrograms}</p>
          </div>

          <div className="border rounded-lg p-3">
            <p className="text-xs">Programs touching SCI</p>
            <p className="text-2xl font-bold text-amber-600">{standards.sciPrograms}</p>
          </div>
        </div>

        <Button
          className="mt-4"
          variant="outline"
          size="sm"
          onClick={() => setShowStandardsDetails(!showStandardsDetails)}
        >
          {showStandardsDetails ? "Hide Standards Details" : "Show Standards Details"}
        </Button>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Standards Details */}
        {showStandardsDetails && (
          <div className="space-y-6">
            {/* SDG Table */}
            <div className="rounded-lg border overflow-x-auto">
              <h3 className="p-3 font-semibold bg-gray-50 border-b">SDG Programs</h3>
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2">SDG Code</th>
                    <th className="px-4 py-2 text-right">Programs</th>
                  </tr>
                </thead>
                <tbody>
                  {sortEntries(standards.sdgCount).map(([code, count]) => (
                    <tr key={code} className={`border-t hover:bg-gray-50 ${count === 0 ? "opacity-40" : ""}`}>
                      <td className="px-4 py-2">{code}</td>
                      <td className="px-4 py-2 text-right">{count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ISO Table */}
            <div className="rounded-lg border overflow-x-auto">
              <h3 className="p-3 font-semibold bg-gray-50 border-b">ISO Programs</h3>
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2">ISO Code</th>
                    <th className="px-4 py-2 text-right">Programs</th>
                  </tr>
                </thead>
                <tbody>
                  {sortEntries(standards.isoCount).map(([code, count]) => (
                    <tr key={code} className={`border-t hover:bg-gray-50 ${count === 0 ? "opacity-40" : ""}`}>
                      <td className="px-4 py-2">{code}</td>
                      <td className="px-4 py-2 text-right">{count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* SCI Table */}
            <div className="rounded-lg border overflow-x-auto">
              <h3 className="p-3 font-semibold bg-gray-50 border-b">SCI Programs</h3>
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2">SCI Code</th>
                    <th className="px-4 py-2 text-right">Programs</th>
                  </tr>
                </thead>
                <tbody>
                  {sortEntries(standards.sciCount).map(([code, count]) => (
                    <tr key={code} className={`border-t hover:bg-gray-50 ${count === 0 ? "opacity-40" : ""}`}>
                      <td className="px-4 py-2">{code}</td>
                      <td className="px-4 py-2 text-right">{count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Program Table */}
        <div className="overflow-x-auto border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Program Name</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Phase</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedPrograms.map((program) => (
                <TableRow key={program.id}>
                  <TableCell>{program.id}</TableCell>
                  <TableCell>{program.programName}</TableCell>
                  <TableCell>Rs {program.budget.toLocaleString()}</TableCell>
                  <TableCell>{program.projectPhase.phase}</TableCell>
                  <TableCell>
                    <Progress value={program.projectPhase.progress} className="w-24 h-2" />
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedProgram(program)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Program Details</DialogTitle>
                        </DialogHeader>
                        {selectedProgram && (
                          <div className="space-y-3 text-sm pt-4">
                            <p><strong>ID:</strong> {selectedProgram.id}</p>
                            <p><strong>Name:</strong> {selectedProgram.programName}</p>
                            <p><strong>Main Program:</strong> {selectedProgram.mainProgram}</p>
                            <p><strong>Budget:</strong> Rs {selectedProgram.budget.toLocaleString()}</p>
                            <p><strong>Phase:</strong> {selectedProgram.projectPhase.phase}</p>
                            <p><strong>Progress:</strong> {selectedProgram.projectPhase.progress}%</p>
                            <p><strong>SDG:</strong> {selectedProgram.sdg?.direct || "N/A"}</p>
                            <p><strong>ISO:</strong> {selectedProgram.iso37120?.direct || "N/A"}</p>
                            <p><strong>SCI:</strong> {selectedProgram.sci2025?.direct || "N/A"}</p>
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
        <div className="flex justify-between items-center pt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            <ChevronLeft size={16} />
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}