declare interface Window {
  currentUrl: string
}

describe('cypress', () => {
  it('should get predefined "hello" message when visit', () => {
    const url = 'https://example.cypress.io/';
    cy.visit(url, {
      onBeforeLoad: (win: Window) => {
        win.currentUrl = url;
        console.log('### set current url')
      }
    });

    cy.window().then(win => {
      console.log('### in cy.window()')
      expect(win.hello).to.equal('Hello, cypress!');
      expect(win.currentUrl).to.equal(url);
    })

    cy.title().should('equal', 'Cypress.io: Kitchen Sink')
  })
})
