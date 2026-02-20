# Backend

docker build -t your_account/movies-api ./movies-api
docker run --name movies-api -p 8000:8050 -e APP_PORT=8050 your_account/movies-api

# Frontend

docker build --build-arg API_URL=http://localhost:8000/api/v1 -t your_account/movies-frontend ./frontend
docker run --name movies-frontend -p 3000:3000 your_account/movies-frontend

docker stop movies-api
docker rm movies-api
