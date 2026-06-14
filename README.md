# R & M

Приложение для просмотра персонажей из сериала «Рик и Морти».

## Changelog

### 1.3.0

- Адаптивная вёрстка: поддержка мобильных устройств (responsive-стили, мобильная панель фильтров)
- PWA: установка приложения на устройство и работа оффлайн, service worker через `vite-plugin-pwa` (Workbox), кэширование API и аватарок, манифест с иконками (включая maskable) и скриншотами

### 1.2.0

- Локализация интерфейса (en/ru): переключатель EN/РУ в шапке, сохранение выбора в `localStorage` (`rick-morty-lang`)

### 1.1.0

- Добавлена тёмная тема: переключатель в шапке, сохранение выбора в `localStorage`, учёт системной темы при первом заходе

### 1.0.0

- Первый релиз: список персонажей с бесконечным скроллом, фильтры, редактирование, страница персонажа, 404 с редиректом

## Деплой

- **Vercel:** https://rick-and-morty-bice-theta.vercel.app/
- **GitHub Pages:** https://ruslan-mrzn.github.io/rick-and-morty/

## Стек

- React 19
- TypeScript
- Vite
- React Router
- React Hook Form + Zod
- SCSS Modules
- Zustand state manager
- i18next + react-i18next
- TanStack React Query
- Vitest + React Testing Library (unit tests)
- Playwright (e2e tests)
- Storybook (компоненты UI-kit)
- Playwright + Storybook (скриншотные тесты)
- vite-plugin-pwa + Workbox (PWA)

## Установка

```bash
# Установка зависимостей
npm install
# или (рекомендуется npm ci для воспроизводимой сборки)
npm ci
```

## Скрипты

```bash
npm run dev     # запуск dev-сервера
npm run build   # сборка продакшн-версии
npm run preview # предпросмотр сборки
npm run bundle:size    # сборка + анализ бандла (открывает в браузере)
npm test        # запуск unit-тестов
npm run test:watch     # запуск тестов в watch-режиме
npm run test:coverage  # запуск тестов с coverage
npm run test:e2e       # запуск e2e-тестов (Playwright)
npm run storybook      # запуск Storybook (порт 6006)
npm run build-storybook # сборка статической версии Storybook
npm run test:visual    # скриншотные тесты (Playwright + Storybook)
npm run test:visual:update # обновление baseline-скриншотов
```

## Unit-тесты

- В проекте настроены unit-тесты.
- Используется стек: **Vitest**, **React Testing Library**, **jsdom**.

## E2E-тесты

- Для e2e используется **Playwright**.
- Тесты лежат в `tests/e2e/`.
- Перед прогоном Playwright поднимает dev-сервер приложения (`playwright.config.ts`, `webServer`).
- Запуск e2e-тестов:

```bash
npm run test:e2e
```

## Storybook

- Для изолированной разработки и документирования UI-компонентов используется **Storybook**.
- Конфигурация: `.storybook/`.
- Stories для shared-компонентов и widgets: `**/index.stories.tsx` рядом с компонентом.
- Тема (`light`/`dark`) задаётся декоратором `withTheme` из `.storybook/decorators/`.
- Запуск:

```bash
npm run storybook
```

Storybook откроется на http://localhost:6006.

## Скриншотные (visual) тесты

- Для визуальной регрессии используется **Playwright** + **Storybook** (iframe-сторис).
- Тесты лежат рядом с компонентом: `index.visual.spec.ts`.
- Baseline-скриншоты хранятся в `__screenshots__/` в папке компонента.
- Общие хелперы: `tests/visual/storybookVisual.ts`.
- Отдельный конфиг: `playwright.visual.config.ts`.

Запуск:

```bash
npm run test:visual          # сравнение с baseline
npm run test:visual:update   # пересоздать baseline после изменения UI
```

При добавлении или изменении stories нужно обновить baseline и закоммитить png в `__screenshots__/`.

## CI на GitHub

- Workflow: `.github/workflows/ci.yml`.
- Триггер: **pull request в `master`** .
- Draft PR пропускаются — полный прогон только после **Ready for review**.

Jobs:

| Job       | Что проверяет                               |
| --------- | ------------------------------------------- |
| `quality` | lint, lint:css, prettier, unit-тесты, build |
| `e2e`     | Playwright e2e-тесты                        |
| `visual`  | Playwright скриншотные тесты                |

## Функционал

- **Просмотр персонажей** — список с бесконечным скроллом
- **Фильтрация** — по имени, статусу, полу, виду
- **Редактирование** — изменение данных персонажа
- **Страница персонажа** — детальная информация
- **404 страница** — с редиректом на главную
- **Тёмная тема** — переключение светлой/тёмной темы в шапке, выбор сохраняется в `localStorage`
- **Локализация (en/ru)** — переключение языка EN/РУ в шапке, выбор сохраняется в `localStorage`
- **Адаптивная вёрстка** — корректное отображение на мобильных и десктопе
- **PWA** — установка на устройство и работа оффлайн

## Структура проекта

```
src/
├── api/           # API-запросы
├── assets/        # Изображения, иконки
├── hooks/         # Кастомные хуки
├── pages/         # Страницы
├── shared/        # Общие компоненты и утилиты
├── stores/        # Стейт-менеджмент
├── widgets/       # Бизнес-блоки
└── main.tsx       # Точка входа
```

## Особенности

- **Архитектура:** Гибридная модульная структура (адаптация FSD)
- SPA с роутингом через React Router
- Валидация форм через Zod
- Хранение в store параметров панели фильтров персонажей
- Оптимизация изображений при сборке
- Динамический `base` путь для деплоя на Vercel и GitHub Pages
- **404 страница:** `public/404.html` перехватывает прямые ссылки и сохраняет путь в `sessionStorage`, затем `src/app/RouterWrapper.tsx` перенаправляет на нужный маршрут внутри приложения
- **Тёмная тема:** CSS-переменные в `src/styles/theme.scss`, переключение через Zustand (`theme.store`), учёт системных настроек при первом заходе
- **i18n (en/ru):** переводы в `src/shared/i18n/locales/`, инициализация в `src/shared/lib/i18n.ts` (подключается в `main.tsx`), переключатель в `MainLayout`; для неизвестных видов с API — fallback на `speciesLabel`
- **Адаптивная вёрстка:** медиа-запросы в SCSS-модулях, мобильная панель фильтров (`FiltersPanel`/`FiltersToggleButton`)
- **PWA:** настроена через `vite-plugin-pwa` (Workbox `generateSW`), `registerType: autoUpdate`; precache app shell + runtime-кэш API (`NetworkFirst`) и аватарок (`CacheFirst`); манифест с иконками (включая maskable) и скриншотами из `public/`; `scope`/`start_url` выводятся из динамического `base` (работает на Vercel и GitHub Pages)
- **TanStack React Query:** `useInfiniteQuery` для списка персонажей (постраничная подгрузка через `pageParam`)
- **Поиск по имени:** submit-модель (Enter/клик по иконке), чтобы не создавать кэш на каждое недопечатанное значение
- Автоматический деплой через GitHub Actions
