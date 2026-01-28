// KMC Health Program Data with mappings to SDG, ISO 37120, and SCI 2025

export interface KMCProgram {
  id: string
  department: string
  sector: string
  subSector: string
  mainProgram: string
  programName: string
  budget: number
  budgetCode: string
  sdg: {
    direct: string
    indirect: string
  }
  iso37120: {
    direct: string
    indirect: string
  }
  sci2025: {
    direct: string
    indirect: string
  }
  thematicArea: string
  cycle: string
  // Linkage scores (0-5 Likert scale)
  linkageScores: {
    sdgScore: number
    isoScore: number
    sciScore: number
    linkageType: "research" | "discussion" | "concurrence" | "declaration"
  }
  // Evaluation regime (0-100%)
  projectPhase: {
    phase: "inception" | "approval" | "tender" | "award" | "completion"
    progress: number
  }
}

export const thematicAreas = [
  {
    id: "health-treatment",
    name: "Health Treatment Services",
    nameNp: "स्वास्थ्य उपचार सेवाहरू",
    description: "Direct health care delivery including curative and preventive services",
    color: "#0891B2",
    icon: "Heart",
    standards: {
      sdg: ["SDG 3.8", "SDG 3.4", "SDG 3.c"],
      iso: ["ISO 37120:12.1", "ISO 37120:12.2", "ISO 37120:12.3"],
      sci: ["Pillar 1 - Health & Wellbeing"],
    },
  },
  {
    id: "capacity-development",
    name: "Capacity Development",
    nameNp: "क्षमता विकास",
    description: "Training, skill development and institutional strengthening",
    color: "#059669",
    icon: "GraduationCap",
    standards: {
      sdg: ["SDG 3.c.1", "SDG 4.7"],
      iso: ["ISO 37120:12.5", "ISO 37120:12.6"],
      sci: ["Pillar 4 - Human Capital Development"],
    },
  },
  {
    id: "digital-health",
    name: "Digital Health Connect",
    nameNp: "डिजिटल स्वास्थ्य",
    description: "E-health, HMIS, telemedicine and digital health records",
    color: "#7C3AED",
    icon: "Laptop",
    standards: {
      sdg: ["SDG 3.d", "SDG 9.c"],
      iso: ["ISO 37120:7.5"],
      sci: ["Pillar 4 - Digital Infrastructure"],
    },
  },
  {
    id: "physical-infrastructure",
    name: "Physical Infrastructure",
    nameNp: "भौतिक पूर्वाधार",
    description: "Health facility construction, equipment and physical assets",
    color: "#DC2626",
    icon: "Building2",
    standards: {
      sdg: ["SDG 3.c", "SDG 9.1"],
      iso: ["ISO 37120:12.2"],
      sci: ["Pillar 3 - Infrastructure"],
    },
  },
  {
    id: "monitoring-evaluation",
    name: "Monitoring & Regulation",
    nameNp: "अनुगमन तथा नियमन",
    description: "Food safety, quality control and health monitoring",
    color: "#EA580C",
    icon: "ClipboardCheck",
    standards: {
      sdg: ["SDG 3.9", "SDG 2.1"],
      iso: ["ISO 37120:11"],
      sci: ["Pillar 2 - Smart Governance"],
    },
  },
  {
    id: "community-health",
    name: "Community Health",
    nameNp: "सामुदायिक स्वास्थ्य",
    description: "FCHV programs, community outreach and volunteer mobilization",
    color: "#0D9488",
    icon: "Users",
    standards: {
      sdg: ["SDG 3.c.1", "SDG 5.6"],
      iso: ["ISO 37120:12.4"],
      sci: ["Pillar 1 - Community Engagement"],
    },
  },
  {
    id: "emergency-services",
    name: "Emergency Services",
    nameNp: "आकस्मिक सेवाहरू",
    description: "Ambulance services, emergency response and disaster health",
    color: "#B91C1C",
    icon: "Siren",
    standards: {
      sdg: ["SDG 3.d.1", "SDG 11.5"],
      iso: ["ISO 37120:12.8"],
      sci: ["Pillar 1 - Emergency Response"],
    },
  },
  {
    id: "environmental-health",
    name: "Environmental Health",
    nameNp: "वातावरणीय स्वास्थ्य",
    description: "Air quality, waste management and healthy lifestyle programs",
    color: "#16A34A",
    icon: "Leaf",
    standards: {
      sdg: ["SDG 3.9", "SDG 11.6", "SDG 13.3"],
      iso: ["ISO 37120:8", "ISO 37120:16"],
      sci: ["Pillar 3 - Environment & Climate"],
    },
  },
]

export const linkageTypes = [
  {
    value: "declaration",
    label: "Declaration",
    score: 1,
    description: "Official policy declaration without verification",
  },
  { value: "discussion", label: "Discussion", score: 2, description: "Discussed in meetings/workshops" },
  { value: "concurrence", label: "Concurrence", score: 3, description: "Agreed upon by multiple stakeholders" },
  { value: "research", label: "Research", score: 4, description: "Backed by research and evidence" },
]

export const projectPhases = [
  { value: "inception", label: "Inception", rangeStart: 0, rangeEnd: 20 },
  { value: "approval", label: "Approval", rangeStart: 21, rangeEnd: 40 },
  { value: "tender", label: "Tender", rangeStart: 41, rangeEnd: 60 },
  { value: "award", label: "Award", rangeStart: 61, rangeEnd: 80 },
  { value: "completion", label: "Completion", rangeStart: 81, rangeEnd: 100 },
]

// Helper function to determine linkage score based on mapping data
function calculateLinkageScore(direct: string, indirect: string): number {
  if (direct && direct !== "NO" && direct !== "No" && direct !== "") {
    return 4 // Direct linkage = high score
  }
  if (indirect && indirect !== "NO" && indirect !== "No" && indirect !== "") {
    return 2 // Indirect linkage = medium score
  }
  return 0 // No linkage
}

// Map thematic area from CSV
function mapThematicArea(thematic: string): string {
  const mapping: Record<string, string> = {
    "Health Treatement Services": "health-treatment",
    "Health Treatment Services": "health-treatment",
    "Capacity Development": "capacity-development",
    "Digital Health Connect": "digital-health",
    "Digital  Health Services": "digital-health",
    "Phycial Infrastructure": "physical-infrastructure",
    "Physical Infrastructure": "physical-infrastructure",
    "Physical Infrastruture": "physical-infrastructure",
    Monitoring: "monitoring-evaluation",
    "Health Treatement Service": "health-treatment",
  }
  return mapping[thematic] || "health-treatment"
}

// Generate random project phase for demo (in real system, this would come from database)
function generateProjectPhase(): {
  phase: "inception" | "approval" | "tender" | "award" | "completion"
  progress: number
} {
  const phases: ("inception" | "approval" | "tender" | "award" | "completion")[] = [
    "inception",
    "approval",
    "tender",
    "award",
    "completion",
  ]
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
  const phaseRanges: Record<string, [number, number]> = {
    inception: [5, 20],
    approval: [25, 40],
    tender: [45, 60],
    award: [65, 80],
    completion: [85, 100],
  }

  const [min, max] = phaseRanges[phase]
  const progress = Math.floor(Math.random() * (max - min + 1)) + min

  return { phase, progress }
}

// KMC Program Data parsed from CSV
export const kmcPrograms: KMCProgram[] = [
  {
    id: "722",
    department: "स्वास्थ्य विभाग",
    sector: "सामाजिक विकास",
    subSector: "स्वास्थ्य",
    mainProgram: "सामुदायिक स्वास्थ्य सेवा",
    programName: "स्वास्थ्य प्रवर्द्धन केन्द्रको मासिक, अर्धवार्षिक र वार्षिक समिक्षा",
    budget: 500,
    budgetCode: "22522",
    sdg: { direct: "3.8(3.8.2)", indirect: "" },
    iso37120: { direct: "", indirect: "No" },
    sci2025: { direct: "NO", indirect: "" },
    thematicArea: "health-treatment",
    cycle: "",
    linkageScores: { sdgScore: 4, isoScore: 0, sciScore: 0, linkageType: "declaration" },
    projectPhase: generateProjectPhase(),
  },
  {
    id: "723",
    department: "स्वास्थ्य विभाग",
    sector: "सामाजिक विकास",
    subSector: "स्वास्थ्य",
    mainProgram: "खोप कार्यक्रम",
    programName: "राष्ट्रियस्तरको भिटामिन ए कार्यक्रम सञ्चालन तथा महिला स्वास्थ्य स्वयं सेविका थप प्रोत्साहन सहित परिचालन",
    budget: 4000,
    budgetCode: "21135",
    sdg: { direct: "3.8(3.8.1)", indirect: "" },
    iso37120: { direct: "", indirect: "No" },
    sci2025: { direct: "NO", indirect: "" },
    thematicArea: "health-treatment",
    cycle: "",
    linkageScores: { sdgScore: 5, isoScore: 0, sciScore: 0, linkageType: "research" },
    projectPhase: generateProjectPhase(),
  },
  {
    id: "724",
    department: "स्वास्थ्य विभाग",
    sector: "सामाजिक विकास",
    subSector: "स्वास्थ्य",
    mainProgram: "सामुदायिक स्वास्थ्य सेवा",
    programName: "सामुदायिक महिला स्वास्थ्य स्वयंसेविका समिति सञ्चालन खर्च",
    budget: 300,
    budgetCode: "21139",
    sdg: { direct: "3.c(3.c.1)", indirect: "" },
    iso37120: { direct: "", indirect: "No" },
    sci2025: { direct: "NO", indirect: "" },
    thematicArea: "community-health",
    cycle: "",
    linkageScores: { sdgScore: 4, isoScore: 0, sciScore: 0, linkageType: "concurrence" },
    projectPhase: generateProjectPhase(),
  },
  {
    id: "735",
    department: "स्वास्थ्य विभाग",
    sector: "सामाजिक विकास",
    subSector: "स्वास्थ्य",
    mainProgram: "सामुदायिक स्वास्थ्य सेवा",
    programName: "डिजिटल कार्ड मार्फत स्वास्थ्य प्रवर्द्धन केन्द्रमा आउने सम्पूर्ण सेवाग्राहीहरुको डिजिटल हेल्थ प्रोफाइल तयार गर्ने",
    budget: 1000,
    budgetCode: "22411",
    sdg: { direct: "3.c(3.c.1)", indirect: "" },
    iso37120: { direct: "12.3,12.5,12.6", indirect: "" },
    sci2025: { direct: "Pillar No. 4/ Component No.4.5 / Indicator: I-071, EMR adoption", indirect: "" },
    thematicArea: "digital-health",
    cycle: "",
    linkageScores: { sdgScore: 4, isoScore: 5, sciScore: 5, linkageType: "research" },
    projectPhase: generateProjectPhase(),
  },
  {
    id: "740",
    department: "स्वास्थ्य विभाग",
    sector: "सामाजिक विकास",
    subSector: "स्वास्थ्य",
    mainProgram: "सामुदायिक स्वास्थ्य सेवा",
    programName: "स्वास्थ्यकर्मीहरुलाई PEN (Package of Essential Non-communicable Diseases) सम्बन्धी तालिम",
    budget: 500,
    budgetCode: "22511",
    sdg: { direct: "3.4(3.4.1)", indirect: "" },
    iso37120: { direct: "12.3,12.5,12.6", indirect: "" },
    sci2025: {
      direct: "Pillar No. 1/ Component No.1.2 / Indicator: I-012, Non-communicable disease and training",
      indirect: "",
    },
    thematicArea: "capacity-development",
    cycle: "",
    linkageScores: { sdgScore: 5, isoScore: 5, sciScore: 5, linkageType: "research" },
    projectPhase: generateProjectPhase(),
  },
  {
    id: "744",
    department: "स्वास्थ्य विभाग",
    sector: "सामाजिक विकास",
    subSector: "स्वास्थ्य",
    mainProgram: "क्षमता अभिबृध्दि",
    programName: "मेडिकल अधिकृतहरुका लागि Advanced Cardiac Life Support(ACLS) तालिम संचालन",
    budget: 1500,
    budgetCode: "22511",
    sdg: { direct: "3(3.c.1)", indirect: "" },
    iso37120: { direct: "12.3,12.5,12.6", indirect: "" },
    sci2025: { direct: "Pillar No. 1/ Component No.1.2 / Indicator: I-012, NCD prevention", indirect: "" },
    thematicArea: "capacity-development",
    cycle: "",
    linkageScores: { sdgScore: 4, isoScore: 5, sciScore: 5, linkageType: "research" },
    projectPhase: generateProjectPhase(),
  },
  {
    id: "767",
    department: "स्वास्थ्य विभाग",
    sector: "सामाजिक विकास",
    subSector: "स्वास्थ्य",
    mainProgram: "सामुदायिक स्वास्थ्य सेवा",
    programName: "खोप सुदृढिकरण तथा पुर्ण खोप कार्यक्रम",
    budget: 2000,
    budgetCode: "22522",
    sdg: { direct: "3.8(3.8.1)", indirect: "" },
    iso37120: { direct: "12.4", indirect: "" },
    sci2025: { direct: "Pillar No. 1/ Component No.1.2 / Indicator: I-010, Immunization", indirect: "" },
    thematicArea: "health-treatment",
    cycle: "",
    linkageScores: { sdgScore: 5, isoScore: 4, sciScore: 5, linkageType: "research" },
    projectPhase: generateProjectPhase(),
  },
  {
    id: "772",
    department: "स्वास्थ्य विभाग",
    sector: "सामाजिक विकास",
    subSector: "स्वास्थ्य",
    mainProgram: "महामारी रोग नियन्त्रण",
    programName: "महामारी रोग रोकथाम, नियन्त्रण तथा व्यवस्थापन",
    budget: 5000,
    budgetCode: "22522",
    sdg: { direct: "3.d(3.d.1)", indirect: "" },
    iso37120: { direct: "", indirect: "" },
    sci2025: { direct: "12.8", indirect: "" },
    thematicArea: "health-treatment",
    cycle: "",
    linkageScores: { sdgScore: 5, isoScore: 0, sciScore: 4, linkageType: "research" },
    projectPhase: generateProjectPhase(),
  },
  {
    id: "778",
    department: "स्वास्थ्य विभाग",
    sector: "सामाजिक विकास",
    subSector: "स्वास्थ्य",
    mainProgram: "क्यान्सर सेवा",
    programName: "प्रोष्टेट तथा अन्य क्यान्सर सम्बन्धी स्क्रिनिङ एवम् प्रारम्भिक उपचार",
    budget: 10000,
    budgetCode: "25312",
    sdg: { direct: "3.4(3.4.1)", indirect: "" },
    iso37120: { direct: "", indirect: "" },
    sci2025: { direct: "12.3,12.1", indirect: "" },
    thematicArea: "health-treatment",
    cycle: "",
    linkageScores: { sdgScore: 5, isoScore: 0, sciScore: 4, linkageType: "research" },
    projectPhase: generateProjectPhase(),
  },
  {
    id: "779",
    department: "स्वास्थ्य विभाग",
    sector: "सामाजिक विकास",
    subSector: "स्वास्थ्य",
    mainProgram: "क्यान्सर सेवा",
    programName: "स्तन, पाठेघर, सर्भिकल क्यान्सरको स्क्रिनिङ तथा प्रारम्भिक उपचारमा सरकारी अस्पतालसँगको सहकार्य",
    budget: 20000,
    budgetCode: "25312",
    sdg: { direct: "3.4(3.4.1)", indirect: "" },
    iso37120: { direct: "", indirect: "" },
    sci2025: { direct: "12.1", indirect: "" },
    thematicArea: "health-treatment",
    cycle: "",
    linkageScores: { sdgScore: 5, isoScore: 0, sciScore: 4, linkageType: "research" },
    projectPhase: generateProjectPhase(),
  },
  {
    id: "781",
    department: "स्वास्थ्य विभाग",
    sector: "सामाजिक विकास",
    subSector: "स्वास्थ्य",
    mainProgram: "विपन्न नागरिक उपचार",
    programName: "महानगरबाट प्रदान गरिने नि:शुल्क एम्बुलेन्स सेवा सञ्चालन",
    budget: 28800,
    budgetCode: "25312",
    sdg: { direct: "3.8(3.8.1)", indirect: "" },
    iso37120: { direct: "", indirect: "" },
    sci2025: { direct: "12.1, 12.3", indirect: "" },
    thematicArea: "emergency-services",
    cycle: "",
    linkageScores: { sdgScore: 5, isoScore: 0, sciScore: 4, linkageType: "concurrence" },
    projectPhase: generateProjectPhase(),
  },
  {
    id: "790",
    department: "स्वास्थ्य विभाग",
    sector: "सामाजिक विकास",
    subSector: "स्वास्थ्य",
    mainProgram: "सामुदायिक स्वास्थ्य सेवा",
    programName: "जेष्ठ नागरिकहरुको लागि निमोनिया भ्याक्सिन कार्यक्रम",
    budget: 20000,
    budgetCode: "27213",
    sdg: { direct: "3.b(3.b.1)", indirect: "" },
    iso37120: { direct: "12", indirect: "" },
    sci2025: { direct: "12.1,12.4", indirect: "" },
    thematicArea: "health-treatment",
    cycle: "",
    linkageScores: { sdgScore: 5, isoScore: 3, sciScore: 4, linkageType: "research" },
    projectPhase: generateProjectPhase(),
  },
  {
    id: "793",
    department: "स्वास्थ्य विभाग",
    sector: "सामाजिक विकास",
    subSector: "स्वास्थ्य",
    mainProgram: "शहरी स्वास्थ्य सेवा",
    programName: "सहरी स्वास्थ्य प्रवर्द्धन केन्द्रहरुमा रहेका ल्यावकक्षमा AC ब्यवस्थापन",
    budget: 3500,
    budgetCode: "31122",
    sdg: { direct: "3.8(3.8.1)", indirect: "" },
    iso37120: { direct: "", indirect: "" },
    sci2025: { direct: "12.2", indirect: "" },
    thematicArea: "physical-infrastructure",
    cycle: "",
    linkageScores: { sdgScore: 4, isoScore: 0, sciScore: 3, linkageType: "declaration" },
    projectPhase: generateProjectPhase(),
  },
  {
    id: "795",
    department: "स्वास्थ्य विभाग",
    sector: "सामाजिक विकास",
    subSector: "स्वास्थ्य",
    mainProgram: "शहरी स्वास्थ्य सेवा",
    programName: "ल्यापटप ३५ थान, डेस्कटप ७० थान र प्रिन्टर ७० थान खरिद",
    budget: 15000,
    budgetCode: "31122",
    sdg: { direct: "3.8(3.8.1)", indirect: "" },
    iso37120: { direct: "", indirect: "" },
    sci2025: { direct: "12.2", indirect: "" },
    thematicArea: "digital-health",
    cycle: "",
    linkageScores: { sdgScore: 4, isoScore: 0, sciScore: 3, linkageType: "declaration" },
    projectPhase: generateProjectPhase(),
  },
  {
    id: "813",
    department: "स्वास्थ्य विभाग (क्रमागत)",
    sector: "सामाजिक विकास",
    subSector: "स्वास्थ्य",
    mainProgram: "सामुदायिक स्वास्थ्य सेवा",
    programName:
      "त्रिभुवन विश्‍वविद्यालय शिक्षण अस्पताललाई HI Tech OPD र Electronics Health Information System निर्माण तथा सञ्चालन",
    budget: 20000,
    budgetCode: "31159",
    sdg: { direct: "3.c(3.c.1)", indirect: "" },
    iso37120: { direct: "12.2", indirect: "" },
    sci2025: { direct: "", indirect: "" },
    thematicArea: "digital-health",
    cycle: "",
    linkageScores: { sdgScore: 4, isoScore: 4, sciScore: 0, linkageType: "concurrence" },
    projectPhase: generateProjectPhase(),
  },
  {
    id: "814",
    department: "स्वास्थ्य विभाग (क्रमागत)",
    sector: "सामाजिक विकास",
    subSector: "स्वास्थ्य",
    mainProgram: "सार्वजनिक निर्माण सुधार",
    programName: "कान्ति बाल अस्पतालमा मोडुलर अपरेशन थिएटर निर्माण",
    budget: 55000,
    budgetCode: "31159",
    sdg: { direct: "3.c(3.c.1)", indirect: "" },
    iso37120: { direct: "12.2", indirect: "" },
    sci2025: { direct: "", indirect: "" },
    thematicArea: "physical-infrastructure",
    cycle: "",
    linkageScores: { sdgScore: 4, isoScore: 4, sciScore: 0, linkageType: "concurrence" },
    projectPhase: generateProjectPhase(),
  },
  {
    id: "22-1",
    department: "स्वास्थ्य विभाग",
    sector: "सामाजिक विकास",
    subSector: "स्वास्थ्य",
    mainProgram: "पोषणयुक्त आहार निर्माण",
    programName: "अनुगनम सामग्री खरिद (Food testing material, chemicals & device)",
    budget: 1000,
    budgetCode: "22611",
    sdg: { direct: "3.9(3.9.3)", indirect: "" },
    iso37120: { direct: "", indirect: "" },
    sci2025: { direct: "11", indirect: "" },
    thematicArea: "monitoring-evaluation",
    cycle: "",
    linkageScores: { sdgScore: 4, isoScore: 0, sciScore: 3, linkageType: "discussion" },
    projectPhase: generateProjectPhase(),
  },
  {
    id: "22-5",
    department: "स्वास्थ्य विभाग",
    sector: "सामाजिक विकास",
    subSector: "स्वास्थ्य",
    mainProgram: "पोषणयुक्त आहार निर्माण",
    programName: "खाद्य स्वच्छता प्रवर्धन तथा प्रमाणिकरणका लागि Food Safety Boot Camp कार्यक्रम",
    budget: 2500,
    budgetCode: "22522",
    sdg: { direct: "", indirect: "" },
    iso37120: { direct: "", indirect: "" },
    sci2025: { direct: "11", indirect: "" },
    thematicArea: "monitoring-evaluation",
    cycle: "",
    linkageScores: { sdgScore: 0, isoScore: 0, sciScore: 3, linkageType: "discussion" },
    projectPhase: generateProjectPhase(),
  },
  {
    id: "22-6",
    department: "स्वास्थ्य विभाग",
    sector: "सामाजिक विकास",
    subSector: "स्वास्थ्य",
    mainProgram: "पोषणयुक्त आहार निर्माण",
    programName: 'कार्ययोजना बमोजिम "Safe Food Kathmandu" अभियान सञ्चालन',
    budget: 2000,
    budgetCode: "22522",
    sdg: { direct: "", indirect: "" },
    iso37120: { direct: "", indirect: "" },
    sci2025: { direct: "11", indirect: "" },
    thematicArea: "monitoring-evaluation",
    cycle: "",
    linkageScores: { sdgScore: 0, isoScore: 0, sciScore: 3, linkageType: "discussion" },
    projectPhase: generateProjectPhase(),
  },
  {
    id: "23-3",
    department: "स्वास्थ्य विभाग",
    sector: "सामाजिक विकास",
    subSector: "स्वास्थ्य",
    mainProgram: "स्वस्थ जीवनशैली सम्बन्धी कार्यक्रम",
    programName: "वायु गुणस्तर अनुगमन नेटवर्कका लागि बहुग्यास मोड्युलको खरिद, जडान तथा सञ्चालन",
    budget: 1000,
    budgetCode: "22522",
    sdg: { direct: "", indirect: "11" },
    iso37120: { direct: "", indirect: "" },
    sci2025: { direct: "8", indirect: "" },
    thematicArea: "environmental-health",
    cycle: "",
    linkageScores: { sdgScore: 2, isoScore: 0, sciScore: 4, linkageType: "research" },
    projectPhase: generateProjectPhase(),
  },
  {
    id: "23-4",
    department: "स्वास्थ्य विभाग",
    sector: "सामाजिक विकास",
    subSector: "स्वास्थ्य",
    mainProgram: "स्वस्थ जीवनशैली सम्बन्धी कार्यक्रम",
    programName: "वायु गुणस्तर जनचेतना (Street Fest/Car free event) लागि हेल्दी सिटिज कार्यक्रम सहयोग",
    budget: 1500,
    budgetCode: "22522",
    sdg: { direct: "", indirect: "11" },
    iso37120: { direct: "", indirect: "" },
    sci2025: { direct: "8", indirect: "" },
    thematicArea: "environmental-health",
    cycle: "",
    linkageScores: { sdgScore: 2, isoScore: 0, sciScore: 4, linkageType: "concurrence" },
    projectPhase: generateProjectPhase(),
  },
  {
    id: "746",
    department: "स्वास्थ्य विभाग",
    sector: "सामाजिक विकास",
    subSector: "स्वास्थ्य",
    mainProgram: "महिला स्वास्थ्य स्वयंसेविका",
    programName: "महिला स्वास्थ्य स्वयंसेविका क्षमता विकास कार्यक्रम तथा तालीम",
    budget: 1000,
    budgetCode: "22511",
    sdg: { direct: "3.c(3.c.1)", indirect: "" },
    iso37120: { direct: "12.3,12.5,12.6", indirect: "" },
    sci2025: { direct: "Pillar No. 1/ Component No.1.2 / Indicator: I-011, Maternal and Child health", indirect: "" },
    thematicArea: "community-health",
    cycle: "",
    linkageScores: { sdgScore: 4, isoScore: 5, sciScore: 5, linkageType: "research" },
    projectPhase: generateProjectPhase(),
  },
  {
    id: "771",
    department: "स्वास्थ्य विभाग",
    sector: "सामाजिक विकास",
    subSector: "स्वास्थ्य",
    mainProgram: "सामुदायिक स्वास्थ्य सेवा",
    programName: "७० वर्ष माथिका ज्येष्ठ नागरिकहरुलाई घरमै आधारभूत स्वास्थ्य सेवा कार्यक्रम",
    budget: 3000,
    budgetCode: "22522",
    sdg: { direct: "3.8(3.8.1)", indirect: "" },
    iso37120: { direct: "", indirect: "" },
    sci2025: { direct: "12.1", indirect: "" },
    thematicArea: "health-treatment",
    cycle: "",
    linkageScores: { sdgScore: 5, isoScore: 0, sciScore: 4, linkageType: "concurrence" },
    projectPhase: generateProjectPhase(),
  },
  {
    id: "801",
    department: "स्वास्थ्य विभाग",
    sector: "सामाजिक विकास",
    subSector: "स्वास्थ्य",
    mainProgram: "सामुदायिक स्वास्थ्य सेवा",
    programName: "अनलाइन डाक्टर सेवा कार्यक्रम संचालन खर्च (Pilot Project)",
    budget: 500,
    budgetCode: "22522",
    sdg: { direct: "3.8(3.8.1)", indirect: "" },
    iso37120: { direct: "12.3", indirect: "" },
    sci2025: { direct: "", indirect: "" },
    thematicArea: "digital-health",
    cycle: "",
    linkageScores: { sdgScore: 4, isoScore: 3, sciScore: 0, linkageType: "discussion" },
    projectPhase: generateProjectPhase(),
  },
  {
    id: "803",
    department: "स्वास्थ्य विभाग",
    sector: "सामाजिक विकास",
    subSector: "स्वास्थ्य",
    mainProgram: "सामुदायिक स्वास्थ्य सेवा",
    programName: "हेल्थ एट स्कुल नियमित स्वास्थ्य परिक्षण शिबिर संचालन",
    budget: 5000,
    budgetCode: "22522",
    sdg: { direct: "3.8(3.8.1)", indirect: "" },
    iso37120: { direct: "", indirect: "" },
    sci2025: { direct: "6", indirect: "" },
    thematicArea: "health-treatment",
    cycle: "",
    linkageScores: { sdgScore: 4, isoScore: 0, sciScore: 3, linkageType: "concurrence" },
    projectPhase: generateProjectPhase(),
  },
  {
    id: "763",
    department: "स्वास्थ्य विभाग",
    sector: "सामाजिक विकास",
    subSector: "स्वास्थ्य",
    mainProgram: "सामुदायिक स्वास्थ्य सेवा",
    programName: "सामुदायिक विद्यालयहरुमा Little Doctors कार्यक्रम संचालन",
    budget: 1000,
    budgetCode: "22522",
    sdg: { direct: "3.8(3.8.1)", indirect: "" },
    iso37120: { direct: "", indirect: "" },
    sci2025: { direct: "6", indirect: "" },
    thematicArea: "capacity-development",
    cycle: "",
    linkageScores: { sdgScore: 4, isoScore: 0, sciScore: 3, linkageType: "discussion" },
    projectPhase: generateProjectPhase(),
  },
  {
    id: "765",
    department: "स्वास्थ्य विभाग",
    sector: "सामाजिक विकास",
    subSector: "स्वास्थ्य",
    mainProgram: "सामुदायिक स्वास्थ्य सेवा",
    programName: "शारीरिक अपाङ्गता भएका व्यक्तिहरुका लागि स्वास्थ्य कार्यक्रम",
    budget: 1500,
    budgetCode: "22522",
    sdg: { direct: "3.8(3.8.1)", indirect: "" },
    iso37120: { direct: "", indirect: "" },
    sci2025: { direct: "12.1", indirect: "" },
    thematicArea: "health-treatment",
    cycle: "",
    linkageScores: { sdgScore: 4, isoScore: 0, sciScore: 3, linkageType: "concurrence" },
    projectPhase: generateProjectPhase(),
  },
  {
    id: "769",
    department: "स्वास्थ्य विभाग",
    sector: "सामाजिक विकास",
    subSector: "स्वास्थ्य",
    mainProgram: "सामुदायिक स्वास्थ्य सेवा",
    programName: "बौद्धिक अपाङ्गता एवम् अटिजम भएका व्यक्तिहरुका लागि स्वास्थ्य कार्यक्रम",
    budget: 2500,
    budgetCode: "22522",
    sdg: { direct: "3.8(3.8.1)", indirect: "" },
    iso37120: { direct: "", indirect: "" },
    sci2025: { direct: "12.1,12.4", indirect: "" },
    thematicArea: "health-treatment",
    cycle: "",
    linkageScores: { sdgScore: 4, isoScore: 0, sciScore: 4, linkageType: "concurrence" },
    projectPhase: generateProjectPhase(),
  },
]

// Key Indicators combining ISO, SDG, and SCI
export const keyIndicators = [
  {
    id: "sdg-3-8",
    standard: "SDG",
    code: "3.8",
    name: "Universal Health Coverage",
    nameNp: "सार्वभौमिक स्वास्थ्य कभरेज",
    description:
      "Achieve universal health coverage, including financial risk protection, access to quality essential health-care services",
    relatedPrograms: 45,
  },
  {
    id: "sdg-3-4",
    standard: "SDG",
    code: "3.4",
    name: "NCD Prevention & Treatment",
    nameNp: "गैरसंचारी रोग रोकथाम",
    description: "Reduce premature mortality from non-communicable diseases through prevention and treatment",
    relatedPrograms: 12,
  },
  {
    id: "sdg-3-c",
    standard: "SDG",
    code: "3.c",
    name: "Health Workforce",
    nameNp: "स्वास्थ्य जनशक्ति",
    description: "Increase health financing and workforce development",
    relatedPrograms: 28,
  },
  {
    id: "iso-12-1",
    standard: "ISO 37120",
    code: "12.1",
    name: "Life Expectancy",
    nameNp: "जीवन प्रत्याशा",
    description: "Average life expectancy in the city",
    relatedPrograms: 8,
  },
  {
    id: "iso-12-2",
    standard: "ISO 37120",
    code: "12.2",
    name: "Hospital Beds",
    nameNp: "अस्पताल शैया",
    description: "Number of in-patient public hospital beds per 100,000 population",
    relatedPrograms: 6,
  },
  {
    id: "iso-12-3",
    standard: "ISO 37120",
    code: "12.3",
    name: "Physicians",
    nameNp: "चिकित्सक",
    description: "Number of physicians per 100,000 population",
    relatedPrograms: 15,
  },
  {
    id: "sci-1-1",
    standard: "SCI 2025",
    code: "Pillar 1.1",
    name: "Maternal & Child Health",
    nameNp: "मातृ तथा बाल स्वास्थ्य",
    description: "I-001: Average life expectancy, I-011: MCH services",
    relatedPrograms: 18,
  },
  {
    id: "sci-4-5",
    standard: "SCI 2025",
    code: "Pillar 4.5",
    name: "Digital Health Systems",
    nameNp: "डिजिटल स्वास्थ्य प्रणाली",
    description: "I-071: EMR adoption, I-073: HMIS usage",
    relatedPrograms: 8,
  },
]
