class ApiError extends Error {

  constructor(status, data) {
    super('Network Error')
    this.status = status
    this.data = data
  }

}

export default ApiError
