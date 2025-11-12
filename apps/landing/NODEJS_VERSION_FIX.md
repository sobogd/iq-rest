# Исправление ошибки Node.js версии в AWS App Runner

## Проблема

Получали ошибку:
```
Failed to build your application source code.
Reason: The specified runtime version is not supported.
```

## Причина

AWS App Runner **не поддерживает Node.js 22** в большинстве регионов.

Поддерживаемые версии:
- ✅ **Node.js 18** (LTS, рекомендуется)
- ✅ Node.js 16 (устаревшая)
- ❌ Node.js 20 (не поддерживается)
- ❌ Node.js 22 (не поддерживается)

## Решение

Откатились на **Node.js 18** - это стабильная LTS версия, которая гарантированно работает во всех регионах AWS App Runner.

## Изменённые файлы

### 1. apprunner.yaml
```yaml
version: 1.0
runtime: nodejs18           # Было: nodejs22
build:
  commands:
    build:
      - npm install --force
      - npm run build
run:
  runtime-version: 18       # Было: 22
  command: node .next/standalone/server.js
  network:
    port: 3000
  env:
    - name: NODE_ENV
      value: production
    - name: PORT
      value: "3000"
```

### 2. Dockerfile
```dockerfile
FROM node:18-alpine AS base   # Было: node:22-alpine
```

### 3. package.json
```json
{
  "engines": {
    "node": ">=18.0.0",      // Было: >=22.0.0
    "npm": ">=9.0.0"         // Было: >=10.0.0
  }
}
```

## Проверка

Build успешно работает:
```bash
npm run build
✓ Compiled successfully
```

## Следующие шаги

Теперь можно деплоить на AWS App Runner:

### Вариант 1: Из Git (проще)
```bash
# 1. Закоммитьте изменения
git add .
git commit -m "Fix: Update to Node.js 18 for AWS App Runner"
git push

# 2. В AWS App Runner Console:
# - Create service
# - Source: GitHub
# - Configuration: apprunner.yaml
# - Runtime: Node.js 18
```

### Вариант 2: Через Docker (надёжнее)
```bash
# 1. Создайте ECR репозиторий
aws ecr create-repository --repository-name sobogdqr --region eu-central-1

# 2. Войдите в ECR
aws ecr get-login-password --region eu-central-1 | \
  docker login --username AWS --password-stdin \
  YOUR_ACCOUNT_ID.dkr.ecr.eu-central-1.amazonaws.com

# 3. Соберите и загрузите
docker build -t sobogdqr .
docker tag sobogdqr:latest YOUR_ACCOUNT_ID.dkr.ecr.eu-central-1.amazonaws.com/sobogdqr:latest
docker push YOUR_ACCOUNT_ID.dkr.ecr.eu-central-1.amazonaws.com/sobogdqr:latest

# 4. Создайте App Runner service через Console
```

## Важно про HTTP/2

**AWS App Runner не поддерживает HTTP/2!**

Чтобы получить HTTP/2 (и выиграть 170ms производительности):
1. Используйте CloudFront перед App Runner (~$65-75/мес)
2. Или мигрируйте на Vercel (~$0-20/мес, HTTP/2 из коробки)

Детали в `HTTP2_SOLUTION.md` и `QUICK_DEPLOY.md`.

## Проверка после деплоя

```bash
# Проверьте что сайт работает
curl -I https://YOUR_DOMAIN.com

# Проверьте HTTP версию
curl --http2 -I https://YOUR_DOMAIN.com
# На App Runner будет: HTTP/1.1 200
# На Vercel будет: HTTP/2 200
```

## Ссылки

- [AWS App Runner Supported Runtimes](https://docs.aws.amazon.com/apprunner/latest/dg/service-source-code-nodejs.html)
- [Node.js Release Schedule](https://nodejs.org/en/about/releases/)
