FIXTURES = __fixtures__
FILE1 = $(FIXTURES)/file1.json
FILE2 = $(FIXTURES)/file2.json
FILE1_YML = $(FIXTURES)/file1.yml
FILE2_YML = $(FIXTURES)/file2.yml


install: 
	npm install
	npm ci

lint:
	npx eslint .

gendiff-help:
	node bin/gendiff.js -h

gendiff-json:
	node bin/gendiff.js $(FILE1) $(FILE2)

gendiff-yml:
	node bin/gendiff.js $(FILE1_YML) $(FILE2_YML)

gendiff-format-stylish:
	node bin/gendiff.js --format stylish $(FILE1) $(FILE2)

gendiff-format-plain:
	node bin/gendiff.js --format plain $(FILE1) $(FILE2)

gendiff-format-json:
	node bin/gendiff.js --format json $(FILE1) $(FILE2)

test:
	npm test

test-coverage:
	npm test -- --coverage

setup: install build 



