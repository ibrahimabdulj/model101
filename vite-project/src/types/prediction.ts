export type AnimalType = "cat" | "dog";

export type ClassificationResponse = {
  animal: AnimalType;
  breed: string;
  confidence: number; // 0–1
};

export type StatusType = "error" | "info" | "success";

