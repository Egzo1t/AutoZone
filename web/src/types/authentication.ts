export type AuthType = "login" | "signup";

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export type AuthenticationRequest =
  | { mode: "login"; data: LoginRequest }
  | { mode: "signup"; data: SignUpRequest };

export interface AuthenticationResponse {
  success: boolean;
  token?: string;
}
