// lib/budget-utils.ts
const COLORS = [
  "#4CAF50",
  "#FF9800",
  "#2196F3",
  "#9C27B0",
  "#F44336",
  "#00BCD4",
  "#FFC107",
  "#8BC34A",
]

const budgetColorMap = new Map<number, string>()

export function getBudgetColor(budget: number) {
  if (!budgetColorMap.has(budget)) {
    const colorIndex = budgetColorMap.size % COLORS.length
    budgetColorMap.set(budget, COLORS[colorIndex])
  }
  return budgetColorMap.get(budget)!
}
