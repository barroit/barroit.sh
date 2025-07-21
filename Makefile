# SPDX-License-Identifier: GPL-3.0-or-later

.PHONY: reactfix dev vite-build local deploy

dev:

reactfix:
	scripts/reactfix.sh

build:
	mkdir build

build/host: build
	ip -4 -brief -json -pretty address show scope global | \
	jq --raw-output .[0].addr_info.[0].local >build/host

dev: reactfix build/host
	npx vite --host $$(cat build/host)

vite-build:
	npx vite build

local: build/host reactfix vite-build
	npx wrangler dev --ip $$(cat build/host)

deploy: reactfix vite-build
	npx wrangler deploy
