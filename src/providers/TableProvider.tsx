import { createContext, useContext } from "react"

export const TableContext = createContext<{ tableUUID: string } | null>(null)

export function useTableUUID() {
  const ctx = useContext(TableContext)
  if (!ctx) throw new Error("useTableUUID must be used inside ProbablyATable")
  return ctx.tableUUID
}
