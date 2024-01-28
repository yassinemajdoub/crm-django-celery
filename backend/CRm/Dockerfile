FROM python:3.9-alpine

WORKDIR /code

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1 


# Install dependencies
COPY requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . /code

EXPOSE 8000

# Set the gunicorn configuration directly in the CMD
CMD ["gunicorn", "--workers", "4", "--bind", "0.0.0.0:8000", "--chdir", "/code/", "CRm.wsgi:application"]
