KNOWN_TARGETS = api web

ARGS := $(filter-out $(KNOWN_TARGETS),$(MAKECMDGOALS))

.DEFAULT: ; :""

.PHONY: start_api
start_api:
	@echo "Starting API"
	./api/vendor/bin/sail up -d

.PHONY: web
web:
	cd ./web && yarn $(ARGS)