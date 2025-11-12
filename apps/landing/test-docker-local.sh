#!/bin/bash

# Script to test Docker build locally before deploying to AWS

echo "================================"
echo "Testing Docker Build Locally"
echo "================================"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Error: Docker is not running"
    echo "Please start Docker Desktop and try again"
    exit 1
fi

echo "✅ Docker is running"
echo ""

# Build the Docker image
echo "🔨 Building Docker image..."
docker build -t sobogdqr:test .

if [ $? -ne 0 ]; then
    echo "❌ Docker build failed"
    exit 1
fi

echo "✅ Docker build successful"
echo ""

# Run the container
echo "🚀 Starting container on port 3000..."
docker run -d \
  --name sobogdqr-test \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e PORT=3000 \
  sobogdqr:test

if [ $? -ne 0 ]; then
    echo "❌ Failed to start container"
    exit 1
fi

echo "✅ Container started"
echo ""

# Wait for the app to start
echo "⏳ Waiting for app to start..."
sleep 5

# Check if the app is running
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000)

if [ "$response" = "200" ]; then
    echo "✅ App is running successfully!"
    echo ""
    echo "🌐 Open: http://localhost:3000"
    echo ""
    echo "To view logs:"
    echo "  docker logs -f sobogdqr-test"
    echo ""
    echo "To stop the container:"
    echo "  docker stop sobogdqr-test"
    echo "  docker rm sobogdqr-test"
else
    echo "❌ App is not responding (HTTP $response)"
    echo ""
    echo "Checking logs:"
    docker logs sobogdqr-test
    echo ""
    echo "Stopping container..."
    docker stop sobogdqr-test
    docker rm sobogdqr-test
    exit 1
fi

echo ""
echo "================================"
echo "Test completed successfully! ✅"
echo "================================"
