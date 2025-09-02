# Zen Botanica - Docker Setup

This document describes the basic Docker setup for the Zen Botanica application.

## Prerequisites

- Docker installed on your system
- Docker Compose (usually comes with Docker Desktop)

## Quick Start

### Option 1: Using Docker Compose (Recommended)

```bash
# Start the application
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

### Option 2: Using the Docker Script

```bash
# Make script executable (first time only)
chmod +x docker.sh

# Build the image
./docker.sh build

# Start with Docker Compose
./docker.sh compose-up

# View logs
./docker.sh logs

# Stop and clean up
./docker.sh compose-down
```

### Option 3: Manual Docker Commands

```bash
# Build the image
docker build -t zen-botanica .

# Run the container
docker run -d -p 3000:3000 --name zen-botanica-app zen-botanica

# View logs
docker logs -f zen-botanica-app

# Stop and remove container
docker stop zen-botanica-app && docker rm zen-botanica-app
```

## Accessing the Application

Once running, the application will be available at:
- **Local**: http://localhost:3000
- **Network**: http://your-ip:3000

## Docker Commands

### Build Image
```bash
docker build -t zen-botanica .
```

### Run Container
```bash
docker run -d -p 3000:3000 --name zen-botanica-app zen-botanica
```

### View Running Containers
```bash
docker ps
```

### View Container Logs
```bash
docker logs -f zen-botanica-app
```

### Stop Container
```bash
docker stop zen-botanica-app
```

### Remove Container
```bash
docker rm zen-botanica-app
```

### Clean Up Docker Resources
```bash
docker system prune -f
docker image prune -f
```

## Environment Variables

The application runs in production mode by default. You can modify the `docker-compose.yml` file to add custom environment variables if needed.

## Health Check

The container includes a health check that verifies the application is responding on port 3000.

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, change the port mapping in `docker-compose.yml`:
```yaml
ports:
  - "3001:3000"  # Maps host port 3001 to container port 3000
```

### Build Issues
If you encounter build issues:
1. Ensure Docker has enough memory allocated
2. Clear Docker cache: `docker system prune -f`
3. Rebuild without cache: `docker build --no-cache -t zen-botanica .`

### Container Won't Start
Check the logs for errors:
```bash
docker logs zen-botanica-app
```

## File Structure

```
zen-botanica/
├── Dockerfile              # Multi-stage Docker build
├── .dockerignore          # Files to exclude from build
├── docker-compose.yml     # Docker Compose configuration
├── docker.sh             # Helper script for Docker operations
└── DOCKER_README.md      # This file
```
