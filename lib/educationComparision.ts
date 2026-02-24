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
  { wardNumber: 18, students: 460, teachers: 30 },
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
  { wardNumber: 31, students: 480, teachers: 55 },
  { wardNumber: 32, students: 600, teachers: 60 },
]

// ===============================
// Core Calculation Function (Improved Logic with Correct Gaps)
// ===============================

export function calculateEducationComparison(
  data: WardEducationData[] = wardEducationData,
  standard: EducationStandard = EDUCATION_STANDARD
): EducationComparisonResult[] {

  const calculated = data.map((ward) => {
    const { students, teachers } = ward

    // Student-Teacher Ratio
    const str = teachers > 0 ? students / teachers : 0
    const roundedSTR = +str.toFixed(2)

    // Required teachers to meet target STR
    const requiredTeachersForTarget = Math.ceil(
      students / standard.target
    )

    // Additional teachers needed
    const additionalTeachersNeeded =
      requiredTeachersForTarget > teachers
        ? requiredTeachersForTarget - teachers
        : 0

    // ✅ Corrected gaps (can be negative if under standard)
    const minimumGap = +(roundedSTR - standard.minimum).toFixed(2)
    const targetGap = +(roundedSTR - standard.target).toFixed(2)

    // Compliance percentage based on required teachers
    const compliancePercentage =
      requiredTeachersForTarget > 0
        ? +((teachers / requiredTeachersForTarget) * 100).toFixed(2)
        : 100

    // Status logic based on shortage severity
    let status: "Good" | "Moderate" | "Critical"

    if (additionalTeachersNeeded === 0) {
      status = "Good"
    } else if (additionalTeachersNeeded <= 5) {
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

  // Ranking based on highest teacher shortage
  const sorted = [...calculated].sort(
    (a, b) =>
      b.additionalTeachersNeeded -
      a.additionalTeachersNeeded
  )

  sorted.forEach((ward, index) => {
    ward.rank = index + 1
  })

  return sorted
}

// ===============================
// City-wide Summary Function (Improved)
// ===============================

export function calculateCityEducationSummary(
  data: WardEducationData[] = wardEducationData,
  standard: EducationStandard = EDUCATION_STANDARD
) {

  const totalStudents = data.reduce(
    (sum, ward) => sum + ward.students,
    0
  )

  const totalTeachers = data.reduce(
    (sum, ward) => sum + ward.teachers,
    0
  )

  const citySTR =
    totalTeachers > 0
      ? +(totalStudents / totalTeachers).toFixed(2)
      : 0

  const requiredTeachersForTarget = Math.ceil(
    totalStudents / standard.target
  )

  const additionalTeachersNeeded =
    requiredTeachersForTarget > totalTeachers
      ? requiredTeachersForTarget - totalTeachers
      : 0

  const compliancePercentage =
    requiredTeachersForTarget > 0
      ? +((totalTeachers / requiredTeachersForTarget) * 100).toFixed(2)
      : 100

  return {
    totalStudents,
    totalTeachers,
    citySTR,
    requiredTeachersForTarget,
    additionalTeachersNeeded,
    compliancePercentage,
  }
}