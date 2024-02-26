export interface BaseResponse<T> {
  data: T
  isPaginated: boolean
  alreadyPaginated: boolean
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
