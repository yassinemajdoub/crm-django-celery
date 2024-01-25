FROM python:3.10

# Switch to the non-root user
USER root

# Create a non-root user
# RUN useradd -m -r -u 1001 celeryuser

WORKDIR /app

# Copy requirements first to leverage Docker caching
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . /app

# Set proper permissions for the working directory
# RUN chown -R celeryuser /app

# Run Celery Beat
CMD ["celery", "-A", "CRm", "beat", "-l", "info"]
