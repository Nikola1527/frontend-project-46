install: 
	npm install
	npm ci

lint:
	npx eslint .

gendiff:
	node bin/gendiff.js $(ARGS)

test:
	npm test

test-coverage:
	npm test -- --coverage

setup: install build 



