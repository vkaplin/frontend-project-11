install: 
		npm ci

lint: 
		npx eslint .
test:
		npm test
.PHONY:
		test