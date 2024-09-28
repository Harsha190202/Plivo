FROM python:3.9-slim
RUN useradd -u 10000 nuser && \
    apt-get update && apt-get install -y sudo && \
    usermod --groups sudo nuser
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
RUN chown -R nuser:nuser /app
USER nuser
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
