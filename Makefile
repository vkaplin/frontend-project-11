install: 
		npm ci

build: 
	  npm run build

lint: 
		npx eslint .
		
test:
		npx playwright test
		
.PHONY:
		test