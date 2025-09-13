from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib

# FastAPI app
app = FastAPI()

# Load model pipeline
model = joblib.load("crop_yield_prediction_model_pipeline.pkl")

# Request schema (9 input fields — Yield nahi lena)
class PredictionRequest(BaseModel):
    Crop: str
    Crop_Year: int
    Season: str
    State: str
    Area: float
    Production: float
    Annual_Rainfall: float
    Fertilizer: float
    Pesticide: float

@app.post("/predict")
async def predict_yield(request: PredictionRequest):
    try:
        # Convert request to dataframe
        input_data = pd.DataFrame([request.dict()])

        # Debugging — check columns
        expected_cols = [
            'Crop', 'Crop_Year', 'Season', 'State',
            'Area', 'Production', 'Annual_Rainfall',
            'Fertilizer', 'Pesticide'
        ]

        missing = [col for col in expected_cols if col not in input_data.columns]
        if missing:
            return {"error": f"Missing columns: {missing}"}

        # Predict yield
        prediction = model.predict(input_data)

        return {
            "input": request.dict(),
            "predicted_yield": float(prediction[0])
        }

    except Exception as e:
        return {"error": str(e)}
