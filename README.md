🚀 Crop Yield Prediction API

This project provides a FastAPI-based Machine Learning service to predict crop yield based on input features like crop type, rainfall, fertilizer, pesticide usage, etc.

It is containerized with Docker + Nginx + Ngrok, so you can run it locally and get a public link instantly (useful for hackathons & demos).

📂 Project Structure
```
ml_service/
│
├── app/
│   ├── main.py              # FastAPI app
│   ├── model.pkl            # Trained ML model
│   └── requirements.txt     # Python dependencies
│
├── nginx/
│   └── default.conf         # Nginx reverse proxy config
│
├── Dockerfile               # FastAPI Docker build
├── docker-compose.yml       # FastAPI + Nginx + Ngrok
├── start.sh                 # One command startup
└── README.md                # Project documentation
```
⚡ Features

🌱 Crop Yield Prediction API built with FastAPI

🐳 Dockerized (easy to deploy anywhere)

🔁 Nginx reverse proxy for stable routing


🛠️ Setup Instructions
1️⃣ Clone the repo
```
git clone https://github.com/<your-username>/<your-repo>.git
cd ml_service
```
2️⃣ Start services with Docker
```
chmod +x start.sh
./start.sh
```
3️⃣ Get your public API URL

The script will print something like:

Your public FastAPI URL:
https://abcd1234.ngrok.io

📌 API Endpoints
```
1. Root
GET /
```
✅ Returns API status.

Response
```
{ "message": "Hello from FastAPI + Docker + Ngrok!" }
```
2. Predict Crop Yield
```
POST /predict
```
Sample Request
```
{
  "Crop": "Rice",
  "Crop_Year": 2022,
  "Season": "Kharif",
  "State": "Andhra Pradesh",
  "Area": 1000,
  "Annual_Rainfall": 1200,
  "Fertilizer": 250,
  "Pesticide": 50
}
```

Sample Response
```
{
  "predicted_yield": 2800.5
}
```
💻 Tech Stack

FastAPI – Backend API

scikit-learn – Machine Learning model

Docker – Containerization

Nginx – Reverse Proxy

Ngrok – Public tunneling

🎯 Use Cases

🌍 Farmers’ decision support

🏫 Academic / Research projects

🏆 Hackathons (public demo link ready in seconds)

🚀 Deployment Options

Local only → Run FastAPI via uvicorn

Docker → Use docker-compose

Ngrok tunnel → Share with anyone on the internet

👨‍💻 Author

Made with ❤️ for real-world applications.
