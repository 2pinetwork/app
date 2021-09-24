#!/usr/bin/env sh

set -eu

REACT_APP_SENTRY_RELEASE=${REACT_APP_SENTRY_RELEASE:=CF-${CF_PAGES_COMMIT_SHA:=dev}}

echo "Building release $REACT_APP_SENTRY_RELEASE"

export REACT_APP_SENTRY_RELEASE

react-scripts build
