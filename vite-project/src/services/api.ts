import type { ClassificationResponse } from "../types/prediction";

const API_ENDPOINT = "http://localhost:8000/predict"; // TODO: replace with your real backend URL

export async function analyzeImage(file: File): Promise<ClassificationResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("The server returned an error. Please try again.");
  }

  const data = (await response.json()) as ClassificationResponse;

  if (
    !data ||
    !data.animal ||
    !data.breed ||
    typeof data.confidence !== "number"
  ) {
    throw new Error("Unexpected response from the server.");
  }

  return data;
}

