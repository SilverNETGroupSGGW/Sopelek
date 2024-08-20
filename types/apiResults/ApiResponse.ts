export interface ApiResponse<T> {
  data: T | null
  status: number
  statusText: string
  hasError?: boolean
  errorMessage?: string
  timestamp: string
}
