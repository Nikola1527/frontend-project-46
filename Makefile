install: 
	npm install
	npm ci

lint:
	npx eslint .

gendiff:
	node bin/gendiff.js -h


test:
	npm test

setup: install build 



