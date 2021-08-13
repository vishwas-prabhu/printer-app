export interface AuthResponse {
  api_response: {
    code: number
    message: string
    jwt_token: string
    name: string
    email: string
  }
}
