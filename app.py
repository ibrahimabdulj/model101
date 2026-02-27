from __future__ import annotations

from io import BytesIO
from typing import Any, Dict

import torch
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, UnidentifiedImageError
from transformers import AutoModelForImageClassification, ViTImageProcessor

MODEL_ID = "AbdulReact/vit-cats-vs-dogs_classifier"

app = FastAPI(title="Cat & Dog Classifier API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
      "http://localhost:5173",
      "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

processor: ViTImageProcessor | None = None
model: AutoModelForImageClassification | None = None
device: torch.device | None = None


@app.on_event("startup")
def load_model() -> None:
    global processor, model, device
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    processor = ViTImageProcessor.from_pretrained(MODEL_ID)
    model = AutoModelForImageClassification.from_pretrained(MODEL_ID)
    model.eval()
    model.to(device)


@app.get("/health")
def health() -> Dict[str, str]:
    return {"status": "ok"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)) -> Dict[str, Any]:
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload an image.")

    if processor is None or model is None or device is None:
        raise HTTPException(status_code=503, detail="Model not loaded yet. Please try again shortly.")

    try:
        raw = await file.read()
        image = Image.open(BytesIO(raw)).convert("RGB")
    except UnidentifiedImageError:
        raise HTTPException(status_code=400, detail="Invalid image file. Please upload a valid JPG/PNG.")
    except Exception:
        raise HTTPException(status_code=400, detail="Failed to read uploaded image.")

    try:
        inputs = processor(images=image, return_tensors="pt")
        inputs = {k: v.to(device) for k, v in inputs.items()}

        with torch.no_grad():
            logits = model(**inputs).logits
            probs = torch.softmax(logits, dim=-1)[0]

        pred_id = int(torch.argmax(probs).item())
        confidence = float(probs[pred_id].item())

        # Map model index to high-level animal label.
        labels = {0: "cat", 1: "dog"}
        animal = labels.get(pred_id, "dog")

        # This specific model is a binary cat/dog classifier and does not
        # provide breed information directly, so we return a placeholder.
        breed = "Unknown"

        return {
            "animal": animal,
            "breed": breed,
            "confidence": confidence,
        }
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=500, detail="Inference failed. Please try again.")

