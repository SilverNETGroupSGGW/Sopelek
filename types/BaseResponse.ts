export interface BaseResponse<T> {
  data: T[]
  isPaginated: true
  alreadyPaginated: true
  pagination: {
    total: number
    count: number
    pageSize: number
    page: number
    totalPages: number
  }
  hasError: boolean
  errorMessage: string | null
  isAuthorized: boolean
  tenantId: string
  organizationId: string
}
