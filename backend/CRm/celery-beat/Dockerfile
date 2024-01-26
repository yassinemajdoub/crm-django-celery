FROM python:3.10

WORKDIR /app

# Copy requirements first to leverage Docker caching
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . /app

RUN mkdir /app/celerybeat-schedule 

# Run Celery Beat
CMD ["celery", "-A", "CRm", "beat", "-l", "info","-s","/app/celerybeat-schedule"]
