#!/bin/bash

set -e # halt script on error

PACKAGE_VERSION=$(node -p -e "require('./package.json').version")

rm -rf dist || exit 0;
mkdir dist;
mkdir dist/lib

cd dist

git config user.name "${GH_USERNAME}"
git config user.email "${GH_EMAIL}"
git init

cp -r ../build/* lib/
cp -r ../embed/* .

git add .
git commit -m "Deployed ${PACKAGE_VERSION} to Github Pages"
#git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
