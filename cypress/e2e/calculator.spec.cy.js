describe('e2e test for calculator app', () => {

  before(() => {
    cy.visit('http://localhost:3000/');
  });

  beforeEach(() => {
    cy.get('[data-test="btn-clr"]').click();
  });

  it('should check expression 2+9-6', () => {
    cy.get('[data-test="btn-2"]').click();
    cy.get('[data-test="btn-plus"]').click();
    cy.get('[data-test="btn-9"]').click();
    cy.get('[data-test="btn-minus"]').click();
    cy.get('[data-test="btn-6"]').click();

    cy.get('[data-test="dashboard"]').should('have.value', '2+9-6');
  })

  it('should check result of expression 2+9-6', () => {
    cy.get('[data-test="btn-2"]').click();
    cy.get('[data-test="btn-plus"]').click();
    cy.get('[data-test="btn-9"]').click();
    cy.get('[data-test="btn-minus"]').click();
    cy.get('[data-test="btn-6"]').click();
    cy.get('[data-test="btn-equal"]').click();

    cy.get('[data-test="dashboard"]').should('have.value', '5');
  })
  it('should check result of expression 1+2+3+4-5-6-7-8-9', () => {
    cy.get('[data-test="btn-1"]').click();
    cy.get('[data-test="btn-plus"]').click();
    cy.get('[data-test="btn-2"]').click();
    cy.get('[data-test="btn-plus"]').click();
    cy.get('[data-test="btn-3"]').click();
    cy.get('[data-test="btn-plus"]').click();
    cy.contains('button', '4').click();
    cy.get('[data-test="btn-minus"]').click();
    cy.contains('button', '5').click();
    cy.get('[data-test="btn-minus"]').click();
    cy.get('[data-test="btn-6"]').click();
    cy.get('[data-test="btn-minus"]').click();
    cy.contains('button', '7').click();
    cy.get('[data-test="btn-minus"]').click();
    cy.contains('button', '8').click();
    cy.get('[data-test="btn-minus"]').click();
    cy.get('[data-test="btn-9"]').click();
    cy.get('[data-test="btn-equal"]').click();

    cy.get('[data-test="dashboard"]').should('have.value', '-25');
  })
  it('should check result expression 10/10', () => {
    cy.get('[data-test="btn-1"]').click();
    cy.get('[data-test="btn-0"]').click();
    cy.get('[data-test="btn-slash"]').click();
    cy.get('[data-test="btn-1"]').click();
    cy.get('[data-test="btn-0"]').click();
    cy.get('[data-test="btn-equal"]').click();

    cy.get('[data-test="dashboard"]').should('have.value', '1');
  })

  it('should check result expression 0.5*10', () => {
    cy.get('[data-test="btn-0"]').click();
    cy.get('[data-test="btn-dot"]').click();
    cy.contains('button', '5').click();
    cy.get('[data-test="btn-multiply"]').click();
    cy.get('[data-test="btn-1"]').click();
    cy.get('[data-test="btn-0"]').click();
    cy.get('[data-test="btn-equal"]').click();

    cy.get('[data-test="dashboard"]').should('have.value', '5');
  })

  it('should check result expression -0.1*99', () => {
    cy.get('[data-test="btn-0"]').click();
    cy.get('[data-test="btn-dot"]').click();
    cy.get('[data-test="btn-1"]').click();
    cy.get('[data-test="btn-plus-minus"]').click();
    cy.get('[data-test="btn-multiply"]').click();
    cy.get('[data-test="btn-9"]').click();
    cy.get('[data-test="btn-9"]').click();
    cy.get('[data-test="btn-equal"]').click();

    cy.get('[data-test="dashboard"]').should('have.value', '-9.9');
  })

  it('should calculate 10 percent of 1,000', () => {
    cy.get('[data-test="btn-1"]').click();
    cy.get('[data-test="btn-0"]').click();
    cy.get('[data-test="btn-0"]').click();
    cy.get('[data-test="btn-0"]').click();
    cy.get('[data-test="btn-multiply"]').click();
    cy.get('[data-test="btn-1"]').click();
    cy.get('[data-test="btn-0"]').click();
    cy.get('[data-test="btn-percentages"]').click();
    cy.get('[data-test="btn-equal"]').click();

    cy.get('[data-test="dashboard"]').should('have.value', '100');
  })

  it('should check clear button', () => {
    cy.get('[data-test="btn-1"]').click();
    cy.get('[data-test="btn-2"]').click();
    cy.get('[data-test="btn-3"]').click();
    cy.get('[data-test="btn-plus"]').click();
    cy.get('[data-test="btn-9"]').click();

    cy.get('[data-test="dashboard"]').should('not.have.value', '');

    cy.get('[data-test="btn-clr"]').click();

    cy.get('[data-test="dashboard"]').should('have.value', '');
  })

  it('should check save button', () => {
    cy.get('[data-test="btn-2"]').click();
    cy.get('[data-test="btn-plus"]').click();
    cy.get('[data-test="btn-3"]').click();
    cy.get('[data-test="btn-equal"]').click();

    cy.get('[data-test="dashboard"]').should('have.value', '5');

    cy.get('[data-test="btn-save"]').click();

    cy.window().then((win) => {
      const savedValue = win.localStorage.getItem('result');
      expect(savedValue).to.equal('5');
    });
  })

  it('should check paste button', () => {
    cy.get('[data-test="btn-9"]').click();
    cy.get('[data-test="btn-9"]').click();
    cy.get('[data-test="btn-save"]').click();

    cy.get('[data-test="btn-clr"]').click();

    cy.get('[data-test="dashboard"]').should('have.value', '');

    cy.get('[data-test="btn-paste"]').click();

    cy.get('[data-test="dashboard"]').should('have.value', '99');
  })

  it('should check change theme, toggle theme button', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('theme', 'theme-one');
      win.setTheme('theme-one');
    });

    cy.get('body').should('have.class', 'theme-one');

    cy.get('[data-test="btn-theme"]').click();
    cy.wait(600);

    cy.get('body').should('have.class', 'theme-second');

    cy.get('[data-test="btn-theme"]').click();
    cy.wait(600);

    cy.get('body').should('have.class', 'theme-one');
  })

})
