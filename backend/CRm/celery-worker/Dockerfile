FROM python:3.10

WORKDIR /app

COPY requirements.txt .

COPY . /app

RUN pip install -r requirements.txt

CMD ["sh", "-c", "celery -A CRm worker -l INFO & exec sleep infinity"]
