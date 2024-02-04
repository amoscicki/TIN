# Projekt semestralny z przedmiotu TIN

## Temat: FlashQuiz - aplikacja do wspomagania nauki

## Autor: Arkadiusz Mościcki - s24095

### Instrukcja przygotowania połączenia z bazą danych

---

- **Skonfigurowane demo aplikacji znajduje się pod adresem: [https://tin-steel.vercel.app/](https://tin-steel.vercel.app/)**

---

1. W pliku .env należy ustawić zmienną `DATABASE_URL` na adres bazy danych, na przykład:

   ```sh
   DATABASE_URL=mysql://root:12345@localhost:3306/FQ
   ```

2. W katalogu static znajduje się plik `FQ.sql`, który należy zaimportować do bazy danych na przykład za pomocą komendy:

   ```sh
   mysql -u root -p < FQ.sql
   ```

3. Przy pomocy komendy

   ```sh
   npx prisma generate
   ```

   należy zainicjować ORM Prisma

### Instrukcja uruchomienia aplikacji

1. W katalogu głównym aplikacji należy uruchomić komendę:

   ```sh
   npm install
   ```

2. Następnie należy uruchomić komendę:

   ```sh
   npm run dev
   ```

3. W celu zbudowania aplikacji należy uruchomić komendę:

   ```sh
   npm run build
   ```

4. W celu uruchomienia skompilowanej aplikacji należy uruchomić komendę:

   ```sh
   npm run preview
   ```
