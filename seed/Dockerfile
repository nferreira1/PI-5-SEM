FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt ./
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY main.py ./
COPY images ./images

ENTRYPOINT ["sh", "-c", "sleep 30 && exec python main.py && tail -f /dev/null"]
