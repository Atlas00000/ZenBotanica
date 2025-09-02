#!/bin/bash

# Zen Botanica Docker Management Script

case "$1" in
  "build")
    echo "Building Docker image..."
    docker build -t zen-botanica .
    ;;
  "run")
    echo "Running container..."
    docker run -d -p 3000:3000 --name zen-botanica-app zen-botanica
    ;;
  "stop")
    echo "Stopping container..."
    docker stop zen-botanica-app
    docker rm zen-botanica-app
    ;;
  "logs")
    echo "Showing container logs..."
    docker logs -f zen-botanica-app
    ;;
  "compose-up")
    echo "Starting with Docker Compose..."
    docker-compose up -d
    ;;
  "compose-down")
    echo "Stopping Docker Compose..."
    docker-compose down
    ;;
  "clean")
    echo "Cleaning up Docker resources..."
    docker system prune -f
    docker image prune -f
    ;;
  *)
    echo "Usage: $0 {build|run|stop|logs|compose-up|compose-down|clean}"
    echo ""
    echo "Commands:"
    echo "  build        - Build Docker image"
    echo "  run          - Run container manually"
    echo "  stop         - Stop and remove container"
    echo "  logs         - Show container logs"
    echo "  compose-up   - Start with Docker Compose"
    echo "  compose-down - Stop Docker Compose"
    echo "  clean        - Clean up Docker resources"
    exit 1
    ;;
esac
