FROM python:3.10

RUN useradd -m -r -u 1001 celeryuser

WORKDIR /app

# Copy requirements first to leverage Docker caching
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . /app

# Create the celerybeat-schedule directory with elevated permissions
RUN mkdir /app/celerybeat-schedule && chmod 777 /app/celerybeat-schedule

USER celeryuser

# Set proper permissions for the working directory
RUN chown -R celeryuser /app

# Run Celery Beat
CMD ["celery", "-A", "CRm", "beat", "-l", "info","-s","/app/celerybeat-schedule"]
