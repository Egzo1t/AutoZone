import type {
  AuthenticationRequest,
  AuthenticationResponse,
} from "@/types/authentication";

const BASE_URL = "http://localhost:3000";

export async function authenticate(
  request: AuthenticationRequest,
): Promise<AuthenticationResponse> {
  const endpoint =
    request.mode === "login" ? "/users/login" : "/users/register";

  const bodyData =
    request.mode === "login"
      ? {
          email: request.data.email.trim(),
          password: request.data.password,
        }
      : {
          name: request.data.name.trim(),
          email: request.data.email.trim(),
          password: request.data.password,
        };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(result?.message || "Authentication failed.");
  }

  return result as AuthenticationResponse;
}
