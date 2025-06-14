
# 🦸 Superhero Database

Це тестове завдання — повноцінний CRUD-додаток для керування супергероями.

Проєкт складається з двох частин:
- **Backend**: NestJS + MongoDB
- **Frontend**: React + Vite + Tailwind

---

## 📂 Структура проєкту

```

volodymyrsf-test\_task\_ninjas/
├── superhero-backend/
└── superhero-frontend/

````

---

## ⚙️ Необхідні залежності

- Node.js >= 18.x
- npm (або yarn)
- MongoDB (локально або в хмарі — наприклад, MongoDB Atlas)

---

# 🔨 ПОРЯДОК ЗАПУСКУ ПРОЄКТУ

---

## 🖥 1️⃣ Backend (NestJS)

### Встановлення залежностей

```bash
  cd superhero-backend
npm install
````

### Створення продакшн-збірки (обов’язково перед запуском!)

```bash
  npm run build
```

### Запуск продакшн-збірки

```bash
  npm run start
```

> ⚠️ Обов'язково спочатку зробити `npm run build` перед запуском!



## 🌐 2️⃣ Frontend (Vite + React)

### Встановлення залежностей

```bash
  cd superhero-frontend
npm install
```

### Створення продакшн-збірки (обов’язково перед запуском!)

```bash
  npm run build
```


### Запуск у режимі розробки 

```bash
  npm run dev
```

---

# 💾 Робота з базою даних
Для заповнення бази даних потрібно перейти в папку `superhero-backend`за допомогою команди `cd superhero-backend` та використати команду `npm run seed`

# 🦸 Приклад даних для заповнення (якщо потрібно вручну)

```json
[
  {
    "nickname": "Superman",
    "real_name": "Clark Kent",
    "origin_description": "Born Kal-El on Krypton, rocketed to Earth before Krypton's destruction.",
    "superpowers": "Flight, Heat Vision, Super Strength",
    "catch_phrase": "Up, up and away!",
    "images": ["https://media.newyorker.com/photos/5909527c1c7a8e33fb38a864/master/w_1600,c_limit/Man_of_Steel-580.jpeg"]
  },
  {
    "nickname": "Batman",
    "real_name": "Bruce Wayne",
    "origin_description": "Parents murdered, trained to fight crime.",
    "superpowers": "Martial arts, Detective skills, Money",
    "catch_phrase": "I'm Batman.",
    "images": ["https://cdn.europosters.eu/image/1300/122573.jpg"]
  },
  {
    "nickname": "Hulk",
    "real_name": "Bruce Banner",
    "origin_description": "Exposed to gamma radiation, transforms into the Hulk when angry.",
    "superpowers": "Limitless strength, durability, regeneration, rage empowerment.",
    "catch_phrase": "HULK SMASH!",
    "images": ["https://upload.wikimedia.org/wikipedia/en/a/aa/Hulk_%28circa_2019%29.png"]
  },
  {
    "nickname": "Spider-Man",
    "real_name": "Peter Parker",
    "origin_description": "Bitten by a radioactive spider, gained spider-like abilities",
    "superpowers": "Wall-crawling, spider sense, super strength, agility, web-shooting",
    "catch_phrase": "With great power comes great responsibility",
    "images": [
      "https://variety.com/wp-content/uploads/2015/02/spidey.jpg",
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1817070/ss_7c2b250a3dfcf7a48b61e6b911894be1d78be8ec.1920x1080.jpg?t=1725652915"
    ]
  },
  {
    "nickname": "Iron Man",
    "real_name": "Tony Stark",
    "origin_description": "A genius billionaire who built a powered suit of armor",
    "superpowers": "Powered armor suit, flight, weapons systems, genius intellect",
    "catch_phrase": "I am Iron Man",
    "images": [
      "https://m.media-amazon.com/images/S/pv-target-images/144540abcf5eb3ca17ea30a5ac3554dcd011a2880ccfba9694d13b27362060fe.jpg"
    ]
  },
  {
    "nickname": "Thor",
    "real_name": "Thor Odinson",
    "origin_description": "The Norse God of Thunder, prince of Asgard",
    "superpowers": "Godlike strength, control over lightning, flight with Mjolnir",
    "catch_phrase": "For Asgard!",
    "images": [
      "https://ichef.bbci.co.uk/images/ic/1200x675/p09t1hg0.jpg",
      "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/2/22/Thor_in_LoveAndThunder_Poster.jpg/revision/latest?cb=20231021012616"
    ]
  }
  
  
]
```

---

# 📌 Технічний стек

* **Backend**: NestJS, Mongoose, MongoDB
* **Frontend**: React, Vite, Tailwind
* **Логування**: Winston
* **Валідація**: class-validator

---

# 🔥 Резюме для перевіряючого

* ✅ Клонуйте репозиторій 
* ✅ Заповніть базу даних
* ✅ Зробіть білди `backend` та `frontend`
* ✅ Запустіть бекенд та фронт (`npm run start` / `npm run dev`)
* ✅ Перевіряйте функціонал через браузер

