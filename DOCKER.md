
# Docker Guide for Habit Builder

This document provides instructions for running the Habit Builder application using Docker.

## Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your machine
- [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop)

## Environment Variables

Before running the application, make sure to set up your environment variables:

1. Copy the example environment file:
   ```
   cp .env.example .env
   ```

2. Edit the `.env` file and add your Supabase credentials and other required values.

## Building and Running the Docker Container

### Using Docker Compose (Recommended)

1. Build and start the container:
   ```
   docker-compose up --build
   ```

2. Access the application at `http://localhost:8080`

3. To stop the container:
   ```
   docker-compose down
   ```

### Using Docker Directly

1. Build the Docker image:
   ```
   docker build -t habit-builder .
   ```

2. Run the container:
   ```
   docker run -p 8080:80 habit-builder
   ```

3. Access the application at `http://localhost:8080`

## Development with Docker

For development with hot-reloading:

1. Run your development server as usual:
   ```
   npm run dev
   ```

2. The development server will be accessible at the configured port (usually 8080)

## Production Deployment

For production deployment, you may want to consider:

- Using a reverse proxy like Nginx or Traefik
- Setting up HTTPS
- Implementing proper logging
- Adding health checks

## Troubleshooting

If you encounter issues:

1. Check Docker logs:
   ```
   docker-compose logs
   ```

2. Verify environment variables are correctly set
3. Ensure ports are not already in use
