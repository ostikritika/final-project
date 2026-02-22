// lib/comparison.ts

// ----------------------
// Types
// ----------------------

export interface WardHealthData {
  wardNumber: number
  population: number
  insuredPopulation: number
}

export interface ComparisonResult {
  wardNumber: number
  population: number         // Added
  insuredPopulation: number  // Added
  percentage: number
  minimumGap: number
  targetGap: number
  status: string
}

// ----------------------
// SCI Standard
// ----------------------

export const SCI_HEALTH_STANDARD = {
  minimum: 50, // %
  target: 75,  // %
}

// ----------------------
// Ward Data (All 32 Wards)
// ----------------------

export const wardHealthData: WardHealthData[] = [
  { wardNumber: 1, population: 8008, insuredPopulation: 1786 },
  { wardNumber: 2, population: 13448, insuredPopulation: 2555 },
  { wardNumber: 3, population: 34866, insuredPopulation: 2016 },
  { wardNumber: 4, population: 47362, insuredPopulation: 3303 },
  { wardNumber: 5, population: 18320, insuredPopulation: 908 },
  { wardNumber: 6, population: 60344, insuredPopulation: 4925 },
  { wardNumber: 7, population: 51581, insuredPopulation: 4156 },
  { wardNumber: 8, population: 51581, insuredPopulation: 2929 },
  { wardNumber: 9, population: 40371, insuredPopulation: 4444 },
  { wardNumber: 10, population: 39820, insuredPopulation: 4793 },
  { wardNumber: 11, population: 17765, insuredPopulation: 2024 },
  { wardNumber: 12, population: 13262, insuredPopulation: 1485 },
  { wardNumber: 13, population: 40456, insuredPopulation: 2700 },
  { wardNumber: 14, population: 58495, insuredPopulation: 5299 },
  { wardNumber: 15, population: 54476, insuredPopulation: 3958 },
  { wardNumber: 16, population: 84441, insuredPopulation: 2552 },
  { wardNumber: 17, population: 25926, insuredPopulation: 2552 },
  { wardNumber: 18, population: 10746, insuredPopulation: 1543 },
  { wardNumber: 19, population: 10711, insuredPopulation: 1623 },
  { wardNumber: 20, population: 10968, insuredPopulation: 1874 },
  { wardNumber: 21, population: 13727, insuredPopulation: 2060 },
  { wardNumber: 22, population: 9187, insuredPopulation: 923 },
  { wardNumber: 23, population: 8357, insuredPopulation: 950 },
  { wardNumber: 24, population: 7619, insuredPopulation: 1066 },
  { wardNumber: 25, population: 13203, insuredPopulation: 1207 },
  { wardNumber: 26, population: 45052, insuredPopulation: 4727 },
  { wardNumber: 27, population: 8563, insuredPopulation: 917 },
  { wardNumber: 28, population: 16211, insuredPopulation: 3222 },
  { wardNumber: 29, population: 33316, insuredPopulation: 2009 },
  { wardNumber: 30, population: 25694, insuredPopulation: 3621 },
  { wardNumber: 31, population: 66121, insuredPopulation: 3810 },
  { wardNumber: 32, population: 76299, insuredPopulation: 5165 },
]

// ----------------------
// Logic Function
// ----------------------

export function calculateHealthComparison(
  data: WardHealthData[]
): ComparisonResult[] {
  return data.map((ward) => {
    const percentage = (ward.insuredPopulation / ward.population) * 100
    const minimumGap = SCI_HEALTH_STANDARD.minimum - percentage
    const targetGap = SCI_HEALTH_STANDARD.target - percentage

    let status = ""
    if (percentage >= SCI_HEALTH_STANDARD.target) {
      status = "Meets Target (75%)"
    } else if (percentage >= SCI_HEALTH_STANDARD.minimum) {
      status = "Meets Minimum (50%)"
    } else {
      status = "Below Minimum"
    }

    return {
      wardNumber: ward.wardNumber,
      population: ward.population,               // Added
      insuredPopulation: ward.insuredPopulation, // Added
      percentage: Number(percentage.toFixed(2)),
      minimumGap: Number(minimumGap.toFixed(2)),
      targetGap: Number(targetGap.toFixed(2)),
      status,
    }
  })
}
