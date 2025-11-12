# 🚀 Быстрый деплой - Шпаргалка

## ✅ Исправлено: Node.js 18

Все файлы обновлены для Node.js 18 (стабильная версия для AWS App Runner).

---

## Файлы готовы к деплою:

- ✅ `apprunner.yaml` - Node.js 18
- ✅ `Dockerfile` - Node.js 18 Alpine
- ✅ `package.json` - engines: node >= 18
- ✅ `next.config.ts` - standalone output
- ✅ Build работает без ошибок

---

## Вариант 1: Vercel (10 минут, РЕКОМЕНДУЮ)

```bash
# Установка
npm i -g vercel

# Логин
vercel login

# Деплой
vercel --prod

# HTTP/2 работает автоматически! ✅
```

**Стоимость:** $0-20/мес
**HTTP/2:** ✅ Да
**Время:** 10 минут

---

## Вариант 2: AWS App Runner с Docker (30 минут)

```bash
# 1. Создайте ECR репозиторий
aws ecr create-repository --repository-name sobogdqr --region eu-central-1

# 2. Войдите в ECR (замените 123456789 на ваш AWS Account ID)
aws ecr get-login-password --region eu-central-1 | \
  docker login --username AWS --password-stdin \
  123456789.dkr.ecr.eu-central-1.amazonaws.com

# 3. Соберите образ
docker build -t sobogdqr .

# 4. Тегируйте
docker tag sobogdqr:latest \
  123456789.dkr.ecr.eu-central-1.amazonaws.com/sobogdqr:latest

# 5. Загрузите
docker push 123456789.dkr.ecr.eu-central-1.amazonaws.com/sobogdqr:latest

# 6. Создайте App Runner service через AWS Console
# - Source: ECR
# - Repository: sobogdqr
# - Port: 3000
# - CPU: 1 vCPU, Memory: 2 GB

# 7. Для HTTP/2: добавьте CloudFront перед App Runner
```

**Стоимость:** $60-70/мес + CloudFront (~$5/мес для HTTP/2)
**HTTP/2:** ❌ Нет (нужен CloudFront)
**Время:** 30-60 минут

---

## Вариант 3: AWS App Runner из Git (15 минут)

```bash
# 1. Закоммитьте изменения
git add .
git commit -m "Update to Node.js 22"
git push

# 2. В AWS App Runner Console:
# - Create service
# - Source: GitHub
# - Repository: ваш репозиторий
# - Branch: main
# - Configuration: apprunner.yaml
# - Runtime: Node.js 22
# - Port: 3000

# 3. Для HTTP/2: добавьте CloudFront
```

**Стоимость:** $60-70/мес
**HTTP/2:** ❌ Нет (нужен CloudFront)
**Время:** 15 минут

---

## ⚠️ Важно про HTTP/2

**AWS App Runner НЕ поддерживает HTTP/2 напрямую!**

Чтобы получить HTTP/2 на AWS нужно:
1. Создать CloudFront Distribution
2. Origin: ваш App Runner URL
3. Включить HTTP/2 в CloudFront settings
4. Обновить DNS на CloudFront

**Или просто используйте Vercel - HTTP/2 работает сразу! ✅**

---

## Проверка после деплоя

```bash
# Проверка HTTP/2
curl --http2 -I https://sobogdqr.com

# Должно быть:
# - Vercel: HTTP/2 200 ✅
# - App Runner без CloudFront: HTTP/1.1 200 ❌
# - App Runner с CloudFront: HTTP/2 200 ✅
```

---

## 💰 Сравнение стоимости

| Платформа | Месяц | HTTP/2 | Сложность |
|-----------|-------|--------|-----------|
| **Vercel Hobby** | $0 | ✅ | Легко |
| **Vercel Pro** | $20 | ✅ | Легко |
| **App Runner** | $60-70 | ❌ | Средне |
| **App Runner + CloudFront** | $65-75 | ✅ | Сложно |

---

## 🎯 Моя рекомендация

### Используйте Vercel!

```bash
vercel --prod
```

Готово! HTTP/2 работает! 🚀

---

## Проблемы?

- Если build падает - проверьте Node.js версию (должна быть 22+)
- Если HTTP/2 не работает на AWS - нужен CloudFront
- Если хотите просто чтобы работало - используйте Vercel

Подробная документация:
- `DEPLOY_AWS_APPRUNNER.md` - полная инструкция AWS
- `HTTP2_SOLUTION.md` - решение проблемы HTTP/2
