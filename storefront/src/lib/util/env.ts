export const getBaseURL = () => {
  const envUrl = process.env.NEXT_PUBLIC_BASE_URL?.trim()

  if (envUrl) {
    return envUrl.replace(/\/$/, "")
  }

  if (process.env.NODE_ENV === "production") {
    return "https://crowncutgems.com"
  }

  return "http://localhost:8000"
}
