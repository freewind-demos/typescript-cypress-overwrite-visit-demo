TypeScript Cypress Override "cy.visit" Demo
=========================================

这个Demo无法成功执行，因为cypress有这个bug: https://github.com/cypress-io/cypress/issues/4259

已经解决：关键是`Cypress.Commands.overwrite`中要返回对原方法的调用，主要是typing有误（返回了`void`）误导了我。

```
npm install
npm run test:open

npm run test:run
```
