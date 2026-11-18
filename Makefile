DOCKER_COMPOSE := docker compose

docker-build-dev: ## Собрать Docker-образ dev (Node + зависимости для Vite)
	$(DOCKER_COMPOSE) build dev

docker-up-dev: ## Запустить dev в Docker с HMR (порт 5173, foreground)
	$(DOCKER_COMPOSE) --profile dev up dev

docker-down: ## Остановить контейнеры compose в этом проекте
	$(DOCKER_COMPOSE) down

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
