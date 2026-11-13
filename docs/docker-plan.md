# План контейнеризации проекта (Docker)

## Обзор

Проект — React + Vite + TypeScript, dev-скрипт `npm run dev` запускает Vite на порту 5173.
Цель — создать **dev-сборку** с Docker: образ собирается один раз, контейнер запускается с hot-reload через Vite dev-сервер.

---

## Шаг 1. Создать `.dockerignore`

**Зачем:** Docker не должен копировать в образ мусорные файлы — локальные `node_modules`, `dist`, `.git`, логи, IDE-файлы. Это уменьшает размер образа и предотвращает подмену изолированных зависимостей контейнера локальными (которые могут быть собраны под другую ОС/архитектуру).

**Что делаем:** Создаём файл `.dockerignore` в корне проекта.

**Содержимое и пояснение каждой строки:**

```
node_modules        # Локальные зависимости — внутри образа будут установлены заново через npm ci
dist                # Собранный бандл — не нужен для dev-образа
.git                # Папка версии — не нужна внутри контейнера
.gitignore          # Дубликат — не нужен внутри контейнера
.md                 # Markdown-файлы — не нужны для запуска приложения
.env                # Локальные переменные окружения — не должны попадать в образ
.env.*              # Все файлы .env кроме .env.example
!.env.example       # Исключение: .env.example оставляем (это шаблон)
.DS_Store           # Артефакты macOS
coverage            # Отчёты покрытия — не нужны в образе
.vscode             # Настройки VS Code хоста — не нужны в контейнере
.idea               # Настройки JetBrains — не нужны в контейнере
*.log               # Все логи — не нужны в образе
```

---

## Шаг 2. Создать `Dockerfile.dev`

**Зачем:** Описываем, как собрать Docker-образ для разработки. Базовый образ — `node:22-alpine` (лёгкий). Копируем манифесты, устанавливаем зависимости через `npm ci` (строго по lock-файлу, детерминированно), открываем порт 5173 и запускаем Vite dev-сервер с `--host 0.0.0.0` (чтобы был доступен извне контейнера).

**Что делаем:** Создаём `Dockerfile.dev` в корне проекта.

**Содержимое и пояснение каждой команды:**

```dockerfile
FROM node:22-alpine
```

**FROM** — указывает базовый образ. `node:22-alpine` = Node.js 22 на Alpine Linux. Alpine — минимальный дистрибутив, поэтому образ весит значительно меньше стандартного `node:22`.

```dockerfile
WORKDIR /app
```

**WORKDIR** — задаёт рабочую директорию внутри контейнера. Все последующие команды (COPY, RUN, CMD) будут выполняться из `/app`.

```dockerfile
COPY package.json package-lock.json ./
```

**COPY** — копирует файлы манифеста (`package.json` и `package-lock.json`) из хоста в рабочую директорию контейнера (`./` = `/app`). Копируем только манифесты первым слоем, чтобы Docker мог кешировать слой установки зависимостей (не пересобирать его при каждом изменении кода).

```dockerfile
RUN npm ci
```

**RUN** — выполняет команду в процессе сборки образа. `npm ci` устанавливает зависимости **строго по `package-lock.json`**, удаляет старые и устанавливает точные версии. Это быстрее и надёжнее `npm install`, и гарантирует детерминированный результат.

```dockerfile
EXPOSE 5173
```

**EXPOSE** — документирует, что контейнер слушает порт 5173. Сам по себе порт не пробрасывается на хост (это делает docker-compose), но это метаданные образа.

```dockerfile
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
```

**CMD** — команда, которая выполняется **при запуске контейнера**. Запускает Vite dev-сервер:

- `--host 0.0.0.0` — позволяет подключаться извне контейнера (по умолчанию Vite слушает только localhost)
- `--port 5173` — порт Vite dev-сервера

---

## Шаг 3. Создать `docker-compose.yml`

**Зачем:** Задаём сервис `dev` для `docker compose`. Образ собирается из Dockerfile.dev. Монтируем проект как volume (чтобы HMR работал — правки на хосте сразу видны в контейнере). `node_modules` храним в именованном томе, чтобы не конфликтовать с bind-mount. Пробрасываем порт 5173. Сервис запускается только по профилю `dev`.

**Что делаем:** Создаём `docker-compose.yml` в корне проекта.

**Содержимое и пояснение каждой секции:**

```yaml
services:
  dev:
```

**services** — корневая секция, в которой перечисляются все контейнеры проекта.
**dev** — имя сервиса (контейнера) для локальной разработки.

```yaml
profiles:
  - dev
```

**profiles** — сервис поднимается только при активном профиле `dev`. Запуск: `docker compose --profile dev up`. Без профиля сервис не запустится по умолчанию — это защищает от случайного запуска.

```yaml
build:
  context: .
  dockerfile: Dockerfile.dev
```

**build** — для этого сервиса образ собирается из Dockerfile, а не берётся готовый из реестра (Docker Hub).

- **context: .** — контекст сборки = текущая папка проекта на хосте. Все относительные пути в Dockerfile (COPY, WORKDIR) отсчитываются отсюда.
- **dockerfile: Dockerfile.dev** — указывает использовать инструкции из конкретного файла (не `Dockerfile` по умолчанию).

```yaml
working_dir: /app
```

**working_dir** — рабочая директория процесса в контейнере. Совпадает с `/app` из Dockerfile, чтобы команды выполнялись в правильной директории.

```yaml
volumes:
  - .:/app
  - dev_node_modules:/app/node_modules
```

**volumes** — монтирует директории хоста в контейнер.

- **`.:/app`** — bind-mount: монтируем каталог проекта с хоста в `/app` контейнера. Правки файлов на хосте мгновенно видны внутри контейнера — это ключевое для работы Vite HMR (hot module replacement).
- **`dev_node_modules:/app/node_modules`** — именованный том: `node_modules` хранятся отдельно от файлов проекта. Это нужно потому, что при bind-mount `.: /app` локальные `node_modules` хоста затерли бы те, что установлены при сборке образа. Именованный том сохраняет изолированные зависимости контейнера.

```yaml
ports:
  - '5173:5173'
```

**ports** — пробрасывает порт между хостом и контейнером.

- **`"5173:5173"`** — порт 5173 на хосте перенаправляется на порт 5173 внутри контейнера. Dev-сервер Vite доступен по `http://localhost:5173` на машине разработчика.

```yaml
stdin_open: true
```

**stdin_open** — оставляет STDIN открытым (`docker run -i`). Позволяет взаимодействовать с процессом в контейнере интерактивно.

```yaml
tty: true
```

**tty** — выделяет псевдо-TTY (`docker run -t`). Эмуляция «живого» терминала: вывод и сигналы (Ctrl+C) ведут себя как в обычной консоли.

```yaml
volumes:
  dev_node_modules:
```

**volumes** (на уровне файла, вне services) — объявляет именованные тома.
**dev_node_modules** — создаёт именованный том, который Compose создаст и переиспользует между запусками. Данные сохраняются даже после `docker compose down`.

---

## Шаг 4. Создать `Makefile`

**Зачем:** Чтобы не писать каждый раз длинные команды `docker compose build` / `docker compose --profile dev up`. Makefile даёт короткие команды: `make docker-build-dev`, `make docker-up-dev`, `make docker-down`.

**Что делаем:** Создаём `Makefile` в корне проекта.

**Содержимое и пояснение каждой цели:**

```makefile
DOCKER_COMPOSE := docker compose
```

Переменная `DOCKER_COMPOSE` хранит команду `docker compose`. Все цели используют её, чтобы не дублировать команду.

```makefile
docker-build-dev: ## Собрать Docker-образ dev (Node + зависимости для Vite)
	$(DOCKER_COMPOSE) build dev
```

Цель **docker-build-dev** — собирает образ для сервиса `dev` по инструкциям из `Dockerfile.dev`. Команда `docker compose build dev` читает Dockerfile и создаёт образ.

```makefile
docker-up-dev: ## Запустить dev в Docker с HMR (порт 5173, foreground)
	$(DOCKER_COMPOSE) --profile dev up dev
```

Цель **docker-up-dev** — запускает контейнер в foreground-режиме (вывод в терминал). Флаг `--profile dev` активирует профиль, `up dev` поднимает сервис. Контейнер работает, пока не нажмёте Ctrl+C.

```makefile
docker-down: ## Остановить контейнеры compose в этом проекте
	$(DOCKER_COMPOSE) down
```

Цель **docker-down** — останавливает и удаляет контейнеры, сети и volumes, созданные этим compose-файлом.

---

## Шаг 5. Расширенные цели Makefile для тестов и проверки

**Зачем:** Вынести проверки качества кода (тесты, линтеры) в Docker. Это гарантирует, что проверки гоняются в той же среде (Alpine + Node 22), где проект и будет работать на сервере. Локальные тесты могут давать ложные результаты из-за разницы в ОС.

**Что делаем:** Добавляем новые цели в `Makefile`.

**Содержимое и пояснение команд:**

```makefile
docker-test: ## Юнит-тесты (Vitest) в свежем контейнере
	$(DOCKER_COMPOSE) --profile dev run --rm dev npm run test

docker-test-coverage: ## Тесты с покрытием в свежем контейнере
	$(DOCKER_COMPOSE) --profile dev run --rm dev npm run test:coverage

docker-test-e2e: ## E2E-тесты (Playwright) в свежем контейнере
	$(DOCKER_COMPOSE) --profile dev run --rm dev npm run test:e2e

docker-lint: ## ESLint в контейнере (переиспользует живой контейнер)
	$(DOCKER_COMPOSE) exec dev npm run lint

docker-lint-css: ## Stylelint в контейнере
	$(DOCKER_COMPOSE) exec dev npm run lint:css

docker-format-check: ## Проверка Prettier в контейнере
	$(DOCKER_COMPOSE) exec dev npm run prettier:check

docker-check: docker-lint docker-lint-css docker-format-check docker-test ## Полный прогон перед пушем
```

**Важное различие: `run --rm` vs `exec`**

- **`run --rm`** (для тестов): Поднимает _новый_ одноразовый контейнер, выполняет команду и удаляет его (`--rm`). Не занимает порт 5173. Можно запускать даже если `dev`-сервер не запущен.
- **`exec`** (для линтеров): Выполняет команду _внутри_ уже запущенного контейнера. Работает быстрее, но требует запущенного `docker compose up`.

**Рекомендация:** Линтеры гонять через `exec` (пока контейнер жив), а тесты через `run` (для полной изоляции и отсутствия конфликтов портов). Одна команда `make docker-check` запустит полный аудит перед `git push`.

---

## Шаг 6. Создать `.devcontainer/devcontainer.json`

**Зачем:** Позволяет GitHub Codespaces (и локальному VS Code с расширением Dev Containers) автоматически поднимать наш `docker-compose.yml` и подключаться к контейнеру `dev` как к полноценной рабочей среде. Не нужно устанавливать Docker Desktop локально, всё крутится в облаке.

**Что делаем:** Создаём папку `.devcontainer/` и файл `devcontainer.json` в корне проекта.

**Содержимое и пояснение каждого поля:**

```json
{
  "name": "rick-and-morty dev",
  "dockerComposeFile": "../docker-compose.yml",
  "service": "dev",
  "workspaceFolder": "/app",
  "runServices": ["dev"],
  "shutdownAction": "stopCompose",
  "customizations": {
    "vscode": {
      "extensions": [
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode",
        "stylelint.vscode-stylelint",
        "ms-azuretools.vscode-docker"
      ]
    }
  }
}
```

**Пояснение полей:**

- **`name`** — отображаемое имя среды в VS Code.
- **`dockerComposeFile`** — путь к compose-файлу (относительно `.devcontainer/`).
- **`service`** — какой сервис из compose поднимать и к которому подключаться.
- **`workspaceFolder`** — рабочая директория внутри контейнера (совпадает с `WORKDIR` в Dockerfile).
- **`runServices: ["dev"]`** — критично! Codespaces по умолчанию игнорирует профили (`profiles: - dev`). Эта строка принудительно запускает нужный сервис.
- **`shutdownAction: "stopCompose"`** — при закрытии codespace корректно остановить compose-стек, чтобы не капали часы.
- **`customizations.vscode.extensions`** — автоматически установит плагины для линтеров и Docker при открытии среды.

**Как работать внутри Codespaces:**

1. VS Code уже подключён к контейнеру `dev` — терминал работает _внутри_ Alpine.
2. Запускать `make docker-up-dev` **не нужно** — окружение уже запущено. Вместо этого в терминале:
   ```bash
   npm run dev -- --host 0.0.0.0 --port 5173
   ```
3. VS Code сам обнаружит порт 5173 и предложит **Forwarded Ports**. Открываешь ссылку — приложение в браузере Windows.
4. HMR работает: правки в редакторе → мгновенное обновление в браузере.
5. Тесты и линтеры: запускаем прямо в терминале (`npm run lint`, `npm run test`), цели `exec` из Makefile здесь не нужны.

---

## Итоговый чеклист

| #   | Файл                              | Статус    |
| --- | --------------------------------- | --------- |
| 1   | `.dockerignore`                   | ✅ Создан |
| 2   | `Dockerfile.dev`                  | ✅ Создан |
| 3   | `docker-compose.yml`              | ✅ Создан |
| 4   | `Makefile`                        | ✅ Создан |
| 5   | `.devcontainer/devcontainer.json` | ✅ Создан |

**После создания:**

1. `make docker-build-dev` — собрать образ
2. `make docker-up-dev` — запустить контейнер
3. Открыть `http://localhost:5173` — Vite dev-сервер в Docker с HMR
4. `make docker-check` — полный прогон линтеров и тестов перед `git push`
5. `make docker-down` — остановить контейнер после работы
6. Для Codespaces: запустить `npm run dev -- --host 0.0.0.0 --port 5173` в терминале и открыть Forwarded Port
