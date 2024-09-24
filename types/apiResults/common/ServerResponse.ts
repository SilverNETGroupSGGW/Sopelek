export interface ServerResponse<T> {
  data: T
  isPaginated: boolean
  alreadyPaginated: boolean
  pagination: {
    total: number
    count: number
    pageSize: number
    page: number
    totalPages: number
  } | null
  hasError: boolean
  errorMessage: string | null
  isAuthorized: boolean
  tenantId: string | null
  organizationId: string | null
}
