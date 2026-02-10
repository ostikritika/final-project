// lib/disaster.ts

// --------------------
// Types
// --------------------
export interface KMCProgram {
  id: string
  department: string
  sector: string
  subSector: string
  mainProgram: string
  programName: string
  budget: number
  budgetCode: string
  sdg: { direct: string[]; indirect: string[] }
  iso37120: { direct: string; indirect: string }
  sci2025: { direct: string; indirect: string }
  thematicArea: string
  cycle?: string
  linkageScores: {
    sdgScore: number
    isoScore: number
    sciScore: number
    linkageType: "research" | "discussion" | "concurrence" | "declaration"
  }
  projectPhase: {
    phase: "inception" | "approval" | "tender" | "award" | "completion"
    progress: number
  }
}

export interface DisasterThematicArea {
  id: string
  name: string
  nameNp: string
  color: string
  programs?: number
  standards: {
    sdg: string[]
    iso: string[]
    sci: string[]
  }
}

export interface DisasterIndicator {
  id: string
  standard: "SDG" | "ISO 37120" | "SCI 2025" | "Combined"
  code: string
  name: string
  nameNp: string
  description?: string
  relatedPrograms: number
}

// --------------------
// Thematic areas
// --------------------
export const disasterThematicAreas: DisasterThematicArea[] = [
  {
    id: "preparedness-risk-reduction",
    name: "Disaster Preparedness & Risk Reduction",
    nameNp: "विपद् तयारी तथा जोखिम न्यूनीकरण",
    color: "#EF4444",
    icon :" Heart",
    standards: {
      sdg: ["SDG 11.5", "SDG 13.1"],
      iso: ["ISO 37120:6.1"],
      sci: ["Pillar 1 - Disaster Risk Reduction"],
    },
  },
  {
    id: "emergency-response",
    name: "Emergency Response & Relief",
    nameNp: "आपतकालीन प्रतिकार्य तथा राहत",
    color: "#F97316",
    standards: {
      sdg: ["SDG 3.d", "SDG 11.b"],
      iso: ["ISO 37120:6.2"],
      sci: ["Pillar 2 - Emergency Management"],
    },
  },
  {
    id: "recovery-reconstruction",
    name: "Recovery & Reconstruction",
    nameNp: "पुनःस्थापना तथा पुनर्निर्माण",
    color: "#10B981",
    standards: {
      sdg: ["SDG 9.1", "SDG 11.c"],
      iso: ["ISO 37120:6.3"],
      sci: ["Pillar 3 - Resilient Infrastructure"],
    },
  },
  {
    id: "capacity-awareness",
    name: "Capacity Building & Awareness",
    nameNp: "क्षमता विकास तथा जनचेतना",
    color: "#3B82F6",
    standards: {
      sdg: ["SDG 11.b"],
      iso: ["ISO 37120:6.4"],
      sci: ["Pillar 4 - Human Capital Development"],
    },
  },
  {
    id: "governance-coordination",
    name: "Governance & Coordination",
    nameNp: "सुशासन तथा समन्वय",
    color: "#8B5CF6",
    standards: {
      sdg: ["SDG 16.6"],
      iso: ["ISO 37120:6.5"],
      sci: ["Pillar 2 - Smart Governance"],
    },
  },
]

// --------------------
// Linkage types
// --------------------
export const linkageTypes = [
  { value: "declaration", label: "Declaration", score: 1, description: "Official policy declaration without verification" },
  { value: "discussion", label: "Discussion", score: 2, description: "Discussed in meetings/workshops" },
  { value: "concurrence", label: "Concurrence", score: 3, description: "Agreed upon by multiple stakeholders" },
  { value: "research", label: "Research", score: 4, description: "Backed by research and evidence" },
]

// --------------------
// Project phases
// --------------------
export const projectPhases = [
  { value: "inception", label: "Inception", rangeStart: 0, rangeEnd: 20 },
  { value: "approval", label: "Approval", rangeStart: 21, rangeEnd: 40 },
  { value: "tender", label: "Tender", rangeStart: 41, rangeEnd: 60 },
  { value: "award", label: "Award", rangeStart: 61, rangeEnd: 80 },
  { value: "completion", label: "Completion", rangeStart: 81, rangeEnd: 100 },
]

// --------------------
// Generate random project phase
// --------------------
function generateProjectPhase(): { phase: KMCProgram["projectPhase"]["phase"]; progress: number } {
  const phases: KMCProgram["projectPhase"]["phase"][] = ["inception", "approval", "tender", "award", "completion"]
  const weights = [0.15, 0.2, 0.25, 0.25, 0.15]

  let random = Math.random()
  let phaseIndex = 0
  for (let i = 0; i < weights.length; i++) {
    random -= weights[i]
    if (random <= 0) {
      phaseIndex = i
      break
    }
  }

  const phase = phases[phaseIndex]
  const ranges: Record<typeof phase, [number, number]> = {
    inception: [0, 20],
    approval: [21, 40],
    tender: [41, 60],
    award: [61, 80],
    completion: [81, 100],
  }
  const [min, max] = ranges[phase]
  const progress = Math.floor(Math.random() * (max - min + 1)) + min
  return { phase, progress }
}

// --------------------
// Disaster Programs
// --------------------
export const disasterPrograms: KMCProgram[] = [
  {
    id: "dis-001",
    department: "विपद् व्यवस्थापन विभाग",
    sector: "सामाजिक विकास",
    subSector: "विपद् व्यवस्थापन",
    mainProgram: "विविध",
    programName: "विपद् व्यवस्थापन कार्यमा खटिने उत्कृष्ट कर्मचारी नगद पुरस्कार तथा सम्मानपत्र खर्च (५ जना)",
    budget: 5000,
    budgetCode: "22612",
    sdg: { direct: ["11.5"], indirect: ["13.1"] },
    iso37120: { direct: "ISO 37120:6.1 Disaster risk reduction plans", indirect: "" },
    sci2025: { direct: "pillar no=1 componentno=1.2 DRR-001", indirect: "" },
    thematicArea: "preparedness-risk-reduction",
    cycle: "",
    linkageScores: { sdgScore: 4, isoScore: 3, sciScore: 3, linkageType: "research" },
    projectPhase: generateProjectPhase(),
  },
  {
    id: "dis-002",
    department: "विपद् व्यवस्थापन विभाग",
    sector: "सामाजिक विकास",
    subSector: "विपद् व्यवस्थापन",
    mainProgram: "विविध",
    programName: "आपतकालीन खोज तथा उद्धार सामग्री खरिद तथा व्यवस्थापन",
    budget: 12000,
    budgetCode: "22615",
    sdg: { direct: ["3.d"], indirect: ["11.b"] },
    iso37120: { direct: "ISO 37120:6.2 Emergency response services", indirect: "" },
    sci2025: { direct: "pillar no=2 componentno=2.1 EMR-004", indirect: "" },
    thematicArea: "emergency-response",
    cycle: "",
    linkageScores: { sdgScore: 3, isoScore: 3, sciScore: 2, linkageType: "concurrence" },
    projectPhase: generateProjectPhase(),
  },
  {
    id: "dis-003",
    department: "विपद् व्यवस्थापन विभाग",
    sector: "सामाजिक विकास",
    subSector: "विपद् व्यवस्थापन",
    mainProgram: "विविध",
    programName: "भूकम्प तथा बाढी पश्चात् क्षतिग्रस्त पूर्वाधार पुनर्निर्माण",
    budget: 25000,
    budgetCode: "22618",
    sdg: { direct: ["9.1"], indirect: ["11.c"] },
    iso37120: { direct: "ISO 37120:6.3 Resilient infrastructure", indirect: "" },
    sci2025: { direct: "pillar no=3 componentno=3.4 REC-010", indirect: "" },
    thematicArea: "recovery-reconstruction",
    cycle: "",
    linkageScores: { sdgScore: 4, isoScore: 4, sciScore: 3, linkageType: "research" },
    projectPhase: generateProjectPhase(),
  },
  {
    id: "dis-004",
    department: "विपद् व्यवस्थापन विभाग",
    sector: "सामाजिक विकास",
    subSector: "विपद् व्यवस्थापन",
    mainProgram: "विविध",
    programName: "समुदायस्तरमा विपद् सचेतना तथा मोक ड्रिल कार्यक्रम",
    budget: 3000,
    budgetCode: "22619",
    sdg: { direct: ["11.b"], indirect: [] },
    iso37120: { direct: "ISO 37120:6.4 Disaster awareness programs", indirect: "" },
    sci2025: { direct: "pillar no=4 componentno=4.2 AWR-006", indirect: "" },
    thematicArea: "capacity-awareness",
    cycle: "",
    linkageScores: { sdgScore: 3, isoScore: 2, sciScore: 2, linkageType: "discussion" },
    projectPhase: generateProjectPhase(),
  },
]

// --------------------
// Disaster Indicators
// --------------------
export const disasterIndicators: DisasterIndicator[] = [
  {
    id: "sdg-11-5",
    standard: "SDG",
    code: "11.5",
    name: "People living in hazard-prone areas",
    nameNp: "जोखिमयुक्त क्षेत्रहरूमा बसोबास गर्ने जनसंख्या",
    description: "Number of people living in areas prone to natural hazards",
    relatedPrograms: 10,
  },
  {
    id: "sdg-13-1",
    standard: "SDG",
    code: "13.1",
    name: "Climate Resilience Preparedness",
    nameNp: "जलवायु प्रतिरोधात्मक तयारी",
    description: "Communities prepared for climate-related disasters through training and awareness",
    relatedPrograms: 8,
  },
  {
    id: "iso-16-1",
    standard: "ISO 37120",
    code: "16.1",
    name: "Disaster Risk Management Plans",
    nameNp: "विपद् व्यवस्थापन योजना",
    description: "Plans implemented for disaster risk reduction at local and municipal levels",
    relatedPrograms: 7,
  },
  {
    id: "sci-dm-1",
    standard: "SCI 2025",
    code: "DM-1",
    name: "Trained First Responders",
    nameNp: "प्रशिक्षित आपतकालीन प्रतिक्रिया दिने कर्मचारी",
    description: "Number of community and school staff trained as emergency first responders",
    relatedPrograms: 12,
  },
]
