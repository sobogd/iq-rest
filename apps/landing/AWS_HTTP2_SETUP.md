# Включение HTTP/2 на AWS App Runner

## Текущая ситуация
Ваш сайт использует HTTP/1.1, хотя AWS App Runner поддерживает HTTP/2 из коробки.

## Проверка конфигурации

### 1. AWS App Runner напрямую
AWS App Runner **автоматически поддерживает HTTP/2** на уровне Load Balancer.

### 2. Если используется CloudFront
CloudFront должен быть настроен на HTTP/2.

## Решение: Настройка CloudFront для HTTP/2

### Через AWS Console:

1. Откройте AWS CloudFront Console
2. Выберите ваш Distribution
3. Перейдите в **Settings** → **Edit**
4. Найдите **Supported HTTP Versions**
5. Убедитесь что выбрано: **HTTP/2, HTTP/1.1, HTTP/1.0**
6. Сохраните изменения

### Через AWS CLI:

```bash
# Получите ID вашего CloudFront Distribution
aws cloudfront list-distributions --query 'DistributionList.Items[*].[Id,DomainName]' --output table

# Обновите конфигурацию (замените YOUR_DISTRIBUTION_ID)
aws cloudfront update-distribution \
  --id YOUR_DISTRIBUTION_ID \
  --distribution-config file://cloudfront-config.json
```

### CloudFront Configuration JSON:

Создайте файл `cloudfront-config.json`:

```json
{
  "HttpVersion": "http2and3",
  "Origins": {
    "Items": [
      {
        "Id": "AppRunner",
        "DomainName": "your-app-runner-url.awsapprunner.com",
        "CustomOriginConfig": {
          "HTTPPort": 80,
          "HTTPSPort": 443,
          "OriginProtocolPolicy": "https-only",
          "OriginSslProtocols": {
            "Quantity": 2,
            "Items": ["TLSv1.2", "TLSv1.3"]
          }
        }
      }
    ]
  },
  "Enabled": true,
  "Comment": "SobogdQR Distribution with HTTP/2",
  "DefaultCacheBehavior": {
    "TargetOriginId": "AppRunner",
    "ViewerProtocolPolicy": "redirect-to-https",
    "AllowedMethods": {
      "Quantity": 7,
      "Items": ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"],
      "CachedMethods": {
        "Quantity": 2,
        "Items": ["GET", "HEAD"]
      }
    },
    "Compress": true,
    "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6"
  }
}
```

## Вариант без CloudFront

Если вы не используете CloudFront, проверьте:

### 1. Убедитесь что используете HTTPS
HTTP/2 работает только через HTTPS.

### 2. Проверьте Custom Domain настройки
В AWS App Runner:
- Откройте ваш сервис
- Перейдите в **Custom domains**
- Убедитесь что используется HTTPS

### 3. Проверьте TLS версию
В настройках App Runner должен быть включен TLS 1.2+

## Проверка после настройки

### Через браузер:
1. Откройте DevTools (F12)
2. Перейдите во вкладку Network
3. Обновите страницу
4. Кликните на любой запрос
5. В Headers найдите `:method` или проверьте Protocol column
6. Должно быть: `h2` (HTTP/2) или `h3` (HTTP/3)

### Через curl:
```bash
curl -I --http2 https://sobogdqr.com
```

Должно быть в ответе:
```
HTTP/2 200
```

### Через онлайн тесты:
- https://tools.keycdn.com/http2-test
- https://www.http2.pro/check

## Альтернатива: Использование Vercel

Если AWS App Runner не решает проблему или слишком сложно настраивать:

```bash
# Установите Vercel CLI
npm i -g vercel

# Деплой
vercel --prod
```

Vercel автоматически:
- ✅ Включает HTTP/2 и HTTP/3
- ✅ Настраивает CDN
- ✅ Оптимизирует производительность
- ✅ Предоставляет бесплатный SSL
- ✅ Автоматический CI/CD из GitHub

## Стоимость

**AWS App Runner + CloudFront:**
- App Runner: ~$25-50/мес (в зависимости от трафика)
- CloudFront: ~$1-5/мес (первые 50GB бесплатно)

**Vercel (Hobby Plan):**
- Бесплатно для некоммерческих проектов
- $20/мес для коммерческих (Pro plan)
- HTTP/2, HTTP/3, и все оптимизации включены

## Рекомендация

Для вашего проекта (Next.js сайт) я рекомендую **Vercel**, потому что:
1. HTTP/2/3 включен автоматически
2. Оптимизация Next.js из коробки
3. Автоматический CI/CD
4. Проще в настройке
5. Часто быстрее чем AWS App Runner

Но если вам нужен AWS (например, для интеграции с другими AWS сервисами), то используйте CloudFront перед App Runner с настройками HTTP/2.
