up:
	docker-compose down
	docker-compose up

up-build:
	docker-compose down
	docker-compose up --build

install:
	docker-compose exec app npm install
	docker-compose exec tracker npm install
	docker-compose exec client npm install

install-app:
	docker-compose exec app npm install

install-tracker:
	docker-compose exec tracker npm install

install-client:
	docker-compose exec client npm install

down:
	docker-compose down