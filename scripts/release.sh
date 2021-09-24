#!/usr/bin/env sh

set -eu

REACT_APP_SENTRY_RELEASE=${REACT_APP_SENTRY_RELEASE:=CF-${CF_PAGES_COMMIT_SHA:=dev}}

export $REACT_APP_SENTRY_RELEASE

node scripts/sentry.js
