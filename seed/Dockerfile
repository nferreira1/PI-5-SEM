FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt ./
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY main.py ./
COPY images ./images

CMD ["python", "main.py"]
