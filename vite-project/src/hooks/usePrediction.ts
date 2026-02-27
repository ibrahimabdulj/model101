import { useCallback, useState } from "react";
import { analyzeImage } from "../services/api";
import type {
  ClassificationResponse,
  StatusType,
} from "../types/prediction";

export function usePrediction() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<ClassificationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<StatusType>("info");

  const handleFileSelected = useCallback((file: File | null) => {
    setResult(null);
    setError(null);
    setStatusMessage(null);

    if (!file) {
      setSelectedFile(null);
      setPreviewUrl(null);
      setError("Please upload a valid JPG or PNG image.");
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);
    setStatusMessage("Analyzing image with AI model...");
    setStatusType("info");

    try {
      const data = await analyzeImage(selectedFile);
      setResult(data);
      setStatusMessage("Analysis complete.");
      setStatusType("success");
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setError(message);
      setStatusMessage("Unable to analyze this image at the moment.");
      setStatusType("error");
    } finally {
      setIsLoading(false);
    }
  }, [selectedFile]);

  return {
    // state
    selectedFile,
    previewUrl,
    result,
    isLoading,
    error,
    statusMessage,
    statusType,
    // actions
    handleFileSelected,
    handleAnalyze,
  };
}

