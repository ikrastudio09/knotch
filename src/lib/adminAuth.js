import { getCurrentUser } from "./auth";

export async function requireAdmin() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthenticated");
  }

  if (user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  return user;
}