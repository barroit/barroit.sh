# SPDX-License-Identifier: GPL-3.0-or-later

SHARED_DIR  := shared/styles shared/react
INIT_SHARED := scripts/init-shared.sh

LIVE := npx vite $(VITE_HOST)

BUNDLE := npx vite build
