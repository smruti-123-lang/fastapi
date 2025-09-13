# Use official Python 3.9 image
FROM python:3.9-slim

# Set work directory
WORKDIR /app

# Copy requirements
COPY requirements.txt .

# Install dependencies
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Expose port
EXPOSE 8000

# Start the app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
