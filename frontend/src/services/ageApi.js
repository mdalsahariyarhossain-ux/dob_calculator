
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8000";

export async function calculateAge(dateOfBirth) {
  const response = await fetch(
    `${API_BASE_URL}/api/calculate-age`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date_of_birth: dateOfBirth,
      }),
    }
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.detail || "Unable to calculate age. Please try again."
    );
  }

  return data;
}
