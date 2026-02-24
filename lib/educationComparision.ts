// ===============================
// Types
// ===============================

export interface WardEducationData {
  wardNumber: number
  students: number
  teachers: number
}

export interface EducationStandard {
  minimum: number // Maximum acceptable STR
  target: number  // Ideal STR
}

export interface EducationComparisonResult extends WardEducationData {
  str: number
  minimumGap: number
  targetGap: number
  compliancePercentage: number
  requiredTeachersForTarget: number
  additionalTeachersNeeded: number
  status: "Good" | "Moderate" | "Critical"
  rank: number
}

// ===============================
// Standards
// ===============================

export const EDUCATION_STANDARD: EducationStandard = {
  minimum: 30,
  target: 25,
}

// ===============================
// Ward Data (All 32 Wards)
// ===============================

export const wardEducationData: WardEducationData[] = [
  { wardNumber: 1, students: 520, teachers: 40 },
  { wardNumber: 2, students: 430, teachers: 50 },
  { wardNumber: 3, students: 600, teachers: 60 },
  { wardNumber: 4, students: 480, teachers: 40 },
  { wardNumber: 5, students: 550, teachers: 65 },
  { wardNumber: 6, students: 400, teachers: 70 },
  { wardNumber: 7, students: 450, teachers: 55 },
  { wardNumber: 8, students: 620, teachers: 45 },
  { wardNumber: 9, students: 530, teachers: 60 },
  { wardNumber: 10, students: 470, teachers: 60 },
  { wardNumber: 11, students: 510, teachers: 50 },
  { wardNumber: 12, students: 580, teachers: 55 },
  { wardNumber: 13, students: 490, teachers: 40 },
  { wardNumber: 14, students: 560, teachers: 60 },
  { wardNumber: 15, students: 420, teachers: 50 },
  { wardNumber: 16, students: 530, teachers: 60 },
  { wardNumber: 17, students: 610, teachers: 30 },
  { wardNumber: 18, students: 460, teachers: 30},
  { wardNumber: 19, students: 590, teachers: 30 },
  { wardNumber: 20, students: 440, teachers: 40 },
  { wardNumber: 21, students: 510, teachers: 40 },
  { wardNumber: 22, students: 570, teachers: 35 },
  { wardNumber: 23, students: 495, teachers: 40 },
  { wardNumber: 24, students: 620, teachers: 60 },
  { wardNumber: 25, students: 430, teachers: 55 },
  { wardNumber: 26, students: 540, teachers: 50 },
  { wardNumber: 27, students: 610, teachers: 50 },
  { wardNumber: 28, students: 470, teachers: 50 },
  { wardNumber: 29, students: 560, teachers: 50 },
  { wardNumber: 30, students: 520, teachers: 50 },
  { wardNumber: 31, students: 480, teachers: 55},
  { wardNumber: 32, students: 600, teachers: 60 },
]

// ===============================
// Core Calculation Function
// ===============================

export function calculateEducationComparison(
  data: WardEducationData[] = wardEducationData,
  standard: EducationStandard = EDUCATION_STANDARD
): EducationComparisonResult[] {

  const calculated = data.map((ward) => {
    const { students, teachers } = ward

    const str = teachers > 0 ? students / teachers : 0
    const roundedSTR = +str.toFixed(2)

    const minimumGap =
      roundedSTR > standard.minimum
        ? +(roundedSTR - standard.minimum).toFixed(2)
        : 0

    const targetGap =
      roundedSTR > standard.target
        ? +(roundedSTR - standard.target).toFixed(2)
        : 0

    const compliancePercentage =
      roundedSTR > 0
        ? +((standard.target / roundedSTR) * 100).toFixed(2)
        : 0

    const requiredTeachersForTarget =
      Math.ceil(students / standard.target)

    const additionalTeachersNeeded =
      requiredTeachersForTarget > teachers
        ? requiredTeachersForTarget - teachers
        : 0

    let status: "Good" | "Moderate" | "Critical"

    if (roundedSTR <= standard.target) {
      status = "Good"
    } else if (roundedSTR <= standard.minimum) {
      status = "Moderate"
    } else {
      status = "Critical"
    }

    return {
      ...ward,
      str: roundedSTR,
      minimumGap,
      targetGap,
      compliancePercentage,
      requiredTeachersForTarget,
      additionalTeachersNeeded,
      status,
      rank: 0, // temporary
    }
  })

  // Ranking (Worst STR gets higher priority rank)
  const sorted = [...calculated].sort((a, b) => b.str - a.str)

  sorted.forEach((ward, index) => {
    ward.rank = index + 1
  })

  return sorted
}

// ===============================
// City-wide Summary Function
// ===============================

export function calculateCityEducationSummary(
  data: WardEducationData[] = wardEducationData
) {
  const totalStudents = data.reduce((sum, w) => sum + w.students, 0)
  const totalTeachers = data.reduce((sum, w) => sum + w.teachers, 0)

  const citySTR =
    totalTeachers > 0
      ? +(totalStudents / totalTeachers).toFixed(2)
      : 0

  return {
    totalStudents,
    totalTeachers,
    citySTR,
  }
}