export type LifeLog = {
  typeId: number
  typeName: string
  Date: Date
}

export type LifeLogSummary = {
  id: number
  typeName: string
  lastDate: Date
  duration: number
  maxDuration: number
  intervalMillis: number
  maxIntervalMillis: number
}