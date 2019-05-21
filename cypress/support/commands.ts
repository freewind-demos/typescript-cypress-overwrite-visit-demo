declare interface Window {
  hello: string
}

function setupHello(win: Window) {
  Object.defineProperty(win, 'hello', {
    get: () => {
      return 'Hello, cypress!';
    }
  })
}

Cypress.Commands.overwrite("visit", (visit: typeof cy.visit, url: string, options: Partial<Cypress.VisitOptions>) => {
  console.log('### visit', visit, url, options);
  const {onBeforeLoad, ...rest} = options;
  return visit(url, {
    ...rest,
    onBeforeLoad: (win) => {
      console.log('### onBeforeLoad')
      setupHello(win);
      console.log('### win.hello', win.hello);
      onBeforeLoad && onBeforeLoad(win)
    }
  })
});
