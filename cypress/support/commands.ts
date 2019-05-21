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

Cypress.Commands.overwrite("visit", (visit: typeof cy.visit, ...params: any) => {
  let options: Partial<Cypress.VisitOptions> & { url: string };

  if (params.length === 1) {
    options = params[0];
  } else {
    const [url, _options] = params;
    options = {
      url,
      ..._options
    };
  }

  const {onBeforeLoad, ...rest} = options;
  return visit({
    ...rest,
    onBeforeLoad: (win) => {
      console.log('### onBeforeLoad')
      setupHello(win);
      console.log('### win.hello', win.hello);
      onBeforeLoad && onBeforeLoad(win)
    }
  })
});
