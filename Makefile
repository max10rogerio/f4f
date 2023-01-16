DOCKER_EXEC_API=docker exec api_api_1 bash -c 

KNOWN_TARGETS = api web start_api

ARGS := $(filter-out $(KNOWN_TARGETS),$(MAKECMDGOALS))

.DEFAULT: ; :""

.PHONY: start_api
start_api:
	@echo "Starting API"
	cd ./api && ./vendor/bin/sail up -d

.PHONY: api
api:
	$(DOCKER_EXEC_API) "$(ARGS)"

.PHONY: web
web:
	cd ./web && yarn $(ARGS)