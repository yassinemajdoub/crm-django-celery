FROM python:3.10

WORKDIR /app

# Copy requirements first to leverage Docker caching
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . /app

USER root

# Create the celerybeat-schedule directory with elevated permissions
RUN mkdir /app/celerybeat-schedule && chmod 777 /app/celerybeat-schedule

# Set proper permissions for the working directory
RUN chown -R 1001 /app  

RUN chown 1001 /app/celerybeat-schedule

# Run Celery Beat
CMD ["celery", "-A", "CRm", "beat", "-l", "info","-s","/app/celerybeat-schedule"]
