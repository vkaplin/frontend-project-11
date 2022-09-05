install: 
		npm ci

lint: 
		npx eslint .
test:
		npx playwright test
.PHONY:
		test