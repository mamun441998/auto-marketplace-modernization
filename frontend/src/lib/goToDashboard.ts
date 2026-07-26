export function goToDashboard(token: string, user: unknown) {
  const base =
    process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3001";

  const params = new URLSearchParams({
    token,
    user: JSON.stringify(user),
  });

  window.location.href = `${base}/?${params.toString()}`;
}