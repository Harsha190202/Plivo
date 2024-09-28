FROM python:3.9-slim
WORKDIR /app
RUN useradd -u 10000 nuser && usermod --groups sudo nuser
WORKDIR /app
COPY . .
RUN chown -R nuser:nuser /app
USER nuser
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]