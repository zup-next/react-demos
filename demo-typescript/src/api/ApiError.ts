class ApiError extends Error {
  status: number
  data: any

  constructor(status: number, data: any) {
    super('Network Error')
    this.status = status
    this.data = data
  }
}

export default ApiError
