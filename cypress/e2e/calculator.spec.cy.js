describe('e2e test for calculator app', () => {

  const clickButton = (buttonName) => {
    cy.get(`[data-test="${buttonName}"]`).click();
  };

  const clickDigit = (digit) => {
    clickButton(`btn-${digit}`);
  };

  const clickOperator = (operator) => {
    const operatorMap = {
      '+': 'btn-plus',
      '-': 'btn-minus',
      '*': 'btn-multiply',
      '/': 'btn-slash',
      '=': 'btn-equal',
      '.': 'btn-dot',
      '%': 'btn-percentages'
    };
    clickButton(operatorMap[operator]);
  };

  const getDashboardValue = () => {
    return cy.get('[data-test="dashboard"]');
  };

  const clearCalculator = () => {
    clickButton('btn-clr');
  };

  const togglePlusMinus = () => {
    clickButton('btn-plus-minus');
  };

  const saveResult = () => {
    clickButton('btn-save');
  };

  const pasteResult = () => {
    clickButton('btn-paste');
  };

  const toggleTheme = () => {
    clickButton('btn-theme');
  };

  before(() => {
    cy.visit('http://localhost:3000/');
  });

  beforeEach(() => {
    clearCalculator();
  });

  it('should check expression 2+9-6', () => {
    clickDigit(2);
    clickOperator('+');
    clickDigit(9);
    clickOperator('-');
    clickDigit(6);

    getDashboardValue().should('have.value', '2+9-6');
  })

  it('should check result of expression 2+9-6', () => {
    clickDigit(2);
    clickOperator('+');
    clickDigit(9);
    clickOperator('-');
    clickDigit(6);
    clickOperator('=');

    getDashboardValue().should('have.value', '5');
  })
  it('should check result of expression 1+2+3+4-5-6-7-8-9', () => {
    clickDigit(1);
    clickOperator('+');
    clickDigit(2);
    clickOperator('+');
    clickDigit(3);
    clickOperator('+');
    cy.contains('button', '4').click();
    clickOperator('-');
    cy.contains('button', '5').click();
    clickOperator('-');
    clickDigit(6);
    clickOperator('-');
    cy.contains('button', '7').click();
    clickOperator('-');
    cy.contains('button', '8').click();
    clickOperator('-');
    clickDigit(9);
    clickOperator('=');

    getDashboardValue().should('have.value', '-25');
  })
  it('should check result expression 10/10', () => {
    clickDigit(1);
    clickDigit(0);
    clickOperator('/');
    clickDigit(1);
    clickDigit(0);
    clickOperator('=');

    getDashboardValue().should('have.value', '1');
  })

  it('should check result expression 0.5*10', () => {
    clickDigit(0);
    clickOperator('.');
    cy.contains('button', '5').click();
    clickOperator('*');
    clickDigit(1);
    clickDigit(0);
    clickOperator('=');

    getDashboardValue().should('have.value', '5');
  })

  it('should check result expression -0.1*99', () => {
    clickDigit(0);
    clickOperator('.');
    clickDigit(1);
    togglePlusMinus();
    clickOperator('*');
    clickDigit(9);
    clickDigit(9);
    clickOperator('=');

    getDashboardValue().should('have.value', '-9.9');
  })

  it('should calculate 10 percent of 1,000', () => {
    clickDigit(1);
    clickDigit(0);
    clickDigit(0);
    clickDigit(0);
    clickOperator('*');
    clickDigit(1);
    clickDigit(0);
    clickOperator('%');
    clickOperator('=');

    getDashboardValue().should('have.value', '100');
  })

  it('should check clear button', () => {
    clickDigit(1);
    clickDigit(2);
    clickDigit(3);
    clickOperator('+');
    clickDigit(9);

    getDashboardValue().should('not.have.value', '');

    clearCalculator();

    getDashboardValue().should('have.value', '');
  })

  it('should check save button', () => {
    clickDigit(2);
    clickOperator('+');
    clickDigit(3);
    clickOperator('=');

    getDashboardValue().should('have.value', '5');

    saveResult();

    cy.window().then((win) => {
      const savedValue = win.localStorage.getItem('result');
      expect(savedValue).to.equal('5');
    });
  })

  it('should check devide on zero',()=>{
    clickDigit(2);
    clickOperator('/');
    clickDigit(0);
    clickOperator('=')
    getDashboardValue().should('have.value', 'Infinity');
  })

  it('should check paste button', () => {
    clickDigit(9);
    clickDigit(9);
    saveResult();

    clearCalculator();

    getDashboardValue().should('have.value', '');

    pasteResult();

    getDashboardValue().should('have.value', '99');
  })

  it('should check change theme, toggle theme button', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('theme', 'theme-one');
      win.setTheme('theme-one');
    });

    cy.get('body').should('have.class', 'theme-one');

    toggleTheme();
    cy.wait(600);

    cy.get('body').should('have.class', 'theme-second');

    toggleTheme();
    cy.wait(600);

    cy.get('body').should('have.class', 'theme-one');
  })

})
