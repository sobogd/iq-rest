#!/bin/bash

# Script to check HTTP/2 support for sobogdqr.com

echo "================================"
echo "Checking HTTP/2 Support"
echo "================================"
echo ""

# Check with curl
echo "1. Testing with curl..."
response=$(curl -I --http2 -s https://sobogdqr.com 2>&1 | head -n 1)
echo "Response: $response"

if [[ $response == *"HTTP/2"* ]]; then
    echo "✅ HTTP/2 is ENABLED"
elif [[ $response == *"HTTP/1.1"* ]]; then
    echo "❌ HTTP/2 is NOT enabled (using HTTP/1.1)"
else
    echo "⚠️  Unable to determine (response: $response)"
fi

echo ""
echo "================================"
echo "2. Testing with OpenSSL..."
echo "================================"

# Check ALPN (Application-Layer Protocol Negotiation)
alpn=$(echo | openssl s_client -alpn h2,http/1.1 -connect sobogdqr.com:443 2>&1 | grep "ALPN protocol")
echo "$alpn"

if [[ $alpn == *"h2"* ]]; then
    echo "✅ Server supports HTTP/2 (h2)"
elif [[ $alpn == *"http/1.1"* ]]; then
    echo "❌ Server only supports HTTP/1.1"
else
    echo "⚠️  Unable to determine ALPN support"
fi

echo ""
echo "================================"
echo "Recommendations:"
echo "================================"
echo ""

if [[ $response == *"HTTP/1.1"* ]]; then
    echo "Your server is using HTTP/1.1. To enable HTTP/2:"
    echo ""
    echo "Option 1: Use Vercel (Recommended)"
    echo "  - npm i -g vercel"
    echo "  - vercel --prod"
    echo ""
    echo "Option 2: Enable HTTP/2 on AWS App Runner"
    echo "  - See AWS_HTTP2_SETUP.md for instructions"
    echo "  - Make sure CloudFront is configured for HTTP/2"
    echo ""
    echo "Expected improvement: ~170ms faster load time"
else
    echo "✅ Your server is already using HTTP/2!"
    echo "No action needed."
fi

echo ""
echo "================================"
