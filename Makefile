# SPDX-License-Identifier: GPL-3.0-or-later

READ_ADDR  := $$(cat build/host)
WRITE_ADDR := ./scripts/local-addr.py
ADDR_FILE  := build/host

LIVE_LISTEN    := --host $(READ_ADDR)
PREVIEW_LISTEN := --ip   $(READ_ADDR)

ifneq ($(HOSTFREE),)
  ADDR_FILE      := /dev/null
  WRITE_ADDR     :=
  LIVE_LISTEN    :=
  PREVIEW_LISTEN :=
endif

.PHONY: init-shared live bundle preview deploy

live:

init-shared:
	scripts/init-shared.sh

build:
	mkdir build

build/host: build
	$(WRITE_ADDR) >$(ADDR_FILE)

live: init-shared build/host
	npx vite $(LIVE_LISTEN)

bundle: init-shared
	npx vite build

preview: bundle build/host
	npx wrangler dev $(PREVIEW_LISTEN)

deploy: bundle
	npx wrangler deploy
