export default class Failure extends Error {
  constructor(message: any) {
    super(message)
    this.name = 'FailureError'
  }
}
