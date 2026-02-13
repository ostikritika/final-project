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
// Ward Data
// ----------------------

export const wardHealthData: WardHealthData[] = [
  {
    wardNumber: 16,
    population: 84441,
    insuredPopulation: 7050,
  },
  {
    wardNumber: 29,
    population: 33316,
    insuredPopulation: 2009,
  },
  {
    wardNumber: 31,
    population: 66121,
    insuredPopulation: 3810,
  },
]

// ----------------------
// Logic Function
// ----------------------

export function calculateHealthComparison(
  data: WardHealthData[]
): ComparisonResult[] {
  return data.map((ward) => {
    const percentage =
      (ward.insuredPopulation / ward.population) * 100

    const minimumGap =
      SCI_HEALTH_STANDARD.minimum - percentage

    const targetGap =
      SCI_HEALTH_STANDARD.target - percentage

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
      percentage: Number(percentage.toFixed(2)),
      minimumGap: Number(minimumGap.toFixed(2)),
      targetGap: Number(targetGap.toFixed(2)),
      status,
    }
  })
}
