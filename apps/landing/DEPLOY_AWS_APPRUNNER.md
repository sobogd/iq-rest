# Деплой Next.js на AWS App Runner

## ✅ Обновлено для Node.js 18

AWS App Runner лучше всего работает с Node.js 18 (LTS версия). Все файлы обновлены.

Теперь у вас есть 2 способа деплоя:

---

## Вариант 1: Использовать Dockerfile (РЕКОМЕНДУЕТСЯ)

AWS App Runner лучше работает с Docker образами.

### Шаг 1: Создайте ECR репозиторий

```bash
# Войдите в AWS
aws configure

# Создайте ECR репозиторий
aws ecr create-repository \
  --repository-name sobogdqr \
  --region eu-central-1

# Получите URI репозитория (будет что-то вроде):
# 123456789.dkr.ecr.eu-central-1.amazonaws.com/sobogdqr
```

### Шаг 2: Соберите и загрузите Docker образ

```bash
# Войдите в ECR
aws ecr get-login-password --region eu-central-1 | \
  docker login --username AWS --password-stdin \
  123456789.dkr.ecr.eu-central-1.amazonaws.com

# Соберите образ
docker build -t sobogdqr .

# Тегируйте образ
docker tag sobogdqr:latest \
  123456789.dkr.ecr.eu-central-1.amazonaws.com/sobogdqr:latest

# Загрузите образ
docker push 123456789.dkr.ecr.eu-central-1.amazonaws.com/sobogdqr:latest
```

### Шаг 3: Создайте App Runner Service

**Через AWS Console:**

1. Откройте [AWS App Runner Console](https://console.aws.amazon.com/apprunner/)
2. Нажмите **Create service**
3. Выберите:
   - **Source**: Container registry → Amazon ECR
   - **ECR repository**: sobogdqr
   - **Image tag**: latest
   - **Deployment trigger**: Manual (или Automatic для CI/CD)
4. Нажмите **Next**
5. Service settings:
   - **Service name**: sobogdqr
   - **Port**: 3000
   - **CPU**: 1 vCPU
   - **Memory**: 2 GB
6. Environment variables:
   - `NODE_ENV`: production
   - `PORT`: 3000
7. Нажмите **Next** → **Create & deploy**

**Через AWS CLI:**

```bash
aws apprunner create-service \
  --service-name sobogdqr \
  --source-configuration '{
    "ImageRepository": {
      "ImageIdentifier": "123456789.dkr.ecr.eu-central-1.amazonaws.com/sobogdqr:latest",
      "ImageRepositoryType": "ECR",
      "ImageConfiguration": {
        "Port": "3000",
        "RuntimeEnvironmentVariables": {
          "NODE_ENV": "production",
          "PORT": "3000"
        }
      }
    },
    "AutoDeploymentsEnabled": false
  }' \
  --instance-configuration '{
    "Cpu": "1 vCPU",
    "Memory": "2 GB"
  }' \
  --region eu-central-1
```

---

## Вариант 2: Использовать apprunner.yaml (Source Code)

Если хотите деплоить из Git репозитория.

### Шаг 1: Подключите GitHub

1. В AWS App Runner Console → **Create service**
2. Source: **Source code repository** → GitHub
3. Подключите ваш GitHub репозиторий
4. Выберите ветку: `main`

### Шаг 2: Configure build

- **Configuration file**: Use a configuration file
- **Configuration file path**: `apprunner.yaml`

### Шаг 3: Service settings

- **Service name**: sobogdqr
- **Port**: 3000
- **CPU**: 1 vCPU
- **Memory**: 2 GB

### Шаг 4: Environment variables

Добавьте переменные окружения если нужно (например, для `.env.local`)

---

## HTTP/2 на AWS App Runner

### ✅ AWS App Runner автоматически поддерживает HTTP/2!

Но чтобы это заработало, нужно:

1. **Custom Domain с HTTPS**
   - Добавьте ваш домен в App Runner
   - App Runner автоматически создаст SSL сертификат

2. **Используйте CloudFront (опционально, но рекомендуется)**
   - Создайте CloudFront Distribution
   - Origin: ваш App Runner URL
   - Включите HTTP/2 в CloudFront settings

---

## Настройка Custom Domain

### Шаг 1: В AWS App Runner Console

1. Откройте ваш сервис
2. **Custom domains** → **Link domain**
3. Введите: `sobogdqr.com`
4. App Runner покажет DNS записи

### Шаг 2: Настройте DNS

Добавьте CNAME записи в вашем DNS провайдере:

```
sobogdqr.com → CNAME → xxxxx.awsapprunner.com
www.sobogdqr.com → CNAME → xxxxx.awsapprunner.com
```

### Шаг 3: Подождите

Валидация может занять 5-60 минут.

---

## CI/CD с GitHub Actions

Создайте `.github/workflows/deploy.yml`:

```yaml
name: Deploy to AWS App Runner

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: eu-central-1

      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v1

      - name: Build and push Docker image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          ECR_REPOSITORY: sobogdqr
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
          docker tag $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG $ECR_REGISTRY/$ECR_REPOSITORY:latest
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:latest

      - name: Deploy to App Runner
        run: |
          aws apprunner start-deployment \
            --service-arn ${{ secrets.APPRUNNER_SERVICE_ARN }}
```

---

## Проверка HTTP/2

После деплоя проверьте:

```bash
# Проверка HTTP/2
curl -I --http2 https://sobogdqr.com

# Должно быть: HTTP/2 200

# Или используйте скрипт
./check-http2.sh
```

---

## Стоимость AWS App Runner

**Примерная стоимость для вашего сайта:**

- **Базовая плата**: $5/месяц (за активный сервис)
- **vCPU**: $0.064/час × 730 часов ≈ $47/месяц (1 vCPU)
- **Memory**: $0.007/GB/час × 2GB × 730 ≈ $10/месяц
- **Requests**: Первые 100,000 бесплатно, потом $0.04 за 1000

**Итого: ~$60-70/месяц**

Для сравнения:
- **Vercel Hobby**: $0/месяц
- **Vercel Pro**: $20/месяц

---

## 🎯 Рекомендация

Если вы только начинаете или это некоммерческий проект:

### Используйте Vercel вместо AWS App Runner!

**Почему:**
- ✅ HTTP/2 и HTTP/3 из коробки (без настройки)
- ✅ В 3-4 раза дешевле ($0-20 vs $60-70)
- ✅ Проще в настройке (1 команда vs множество шагов)
- ✅ Лучшая оптимизация для Next.js
- ✅ Автоматический CI/CD

**Как:**
```bash
npm i -g vercel
vercel login
vercel --prod
```

Готово! 🚀

---

## Возникли проблемы?

Проверьте:
1. `next.config.ts` - должен быть `output: "standalone"`
2. `.env.local` файлы не коммитятся в Git
3. Port 3000 открыт в App Runner
4. Custom domain правильно настроен

Или просто переезжайте на Vercel - проще и дешевле! 😊
