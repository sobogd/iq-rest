# Инструкция по добавлению фотографии

## Замена фотографии на странице контактов

В данный момент на странице контактов используется SVG placeholder (`/public/bogdan-photo.svg`).

### Чтобы добавить вашу фотографию:

1. **Подготовьте фотографию:**
   - Желательно квадратная фотография (например 500x500px)
   - Формат: JPG, PNG или WEBP
   - Хорошее качество, профессиональная фотография

2. **Замените файл:**
   - Удалите файл `/public/bogdan-photo.svg`
   - Добавьте вашу фотографию как `/public/bogdan-photo.jpg` (или .png/.webp)

3. **Обновите код (если используете не JPG):**

   Откройте файл `/app/[locale]/contacts/page.tsx` и измените:

   ```tsx
   <Image
     src="/bogdan-photo.svg"  // <- измените расширение
     alt="Bogdan Sokolov"
     fill
     className="object-cover"
     priority
   />
   ```

   На:

   ```tsx
   <Image
     src="/bogdan-photo.png"  // или .webp
     alt="Bogdan Sokolov"
     fill
     className="object-cover"
     priority
   />
   ```

4. **Перезапустите сервер разработки:**
   ```bash
   npm run dev
   ```

Фотография будет отображаться в круглой рамке на странице контактов.
