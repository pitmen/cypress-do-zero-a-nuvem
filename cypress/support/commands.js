// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmitOld1', () => {
  cy.get('#firstName').type('Pitter') //comando utilizado para preencher o campo de nome
  cy.get('#lastName').type('Mendes Lacerda') //comando utilizado para preencher o campo de sobrenome
  cy.get('#email').type('pitter-puk@hotmail.com') //comando utilizado para preencher o campo de email
  cy.get('#open-text-area').type('Teste de preenchimento de formulário com Cypress. ') //comando utilizado para preencher o campo de mensagem
  cy.get('button[type="submit"]').click() //comando utilizado para clicar no botão de enviar
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmitOld2', data => {
  cy.get('#firstName').type(data.firstName) //comando utilizado para preencher o campo de nome
  cy.get('#lastName').type(data.lastName) //comando utilizado para preencher o campo de sobrenome
  cy.get('#email').type(data.email) //comando utilizado para preencher o campo de email
  cy.get('#phone').type('11948580867')
  cy.get('#open-text-area').type('Teste de preenchimento de formulário com Cypress. ') //comando utilizado para preencher o campo de mensagem
  cy.get('button[type="submit"]').click() //comando utilizado para clicar no botão de enviar
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data={
  firstName: 'Pitter',
  lastName: 'Mendes Lacerda',
  email: 'pitter-puk@hotmail.com',
  phone: '11948580867',
  text: 'Teste de preenchimento de formulário com Cypress.'
}) => {
  cy.get('#firstName').type(data.firstName) //comando utilizado para preencher o campo de nome
  cy.get('#lastName').type(data.lastName) //comando utilizado para preencher o campo de sobrenome
  cy.get('#email').type(data.email) //comando utilizado para preencher o campo de email
  cy.get('#phone').type('11948580867')
  cy.get('#open-text-area').type('Teste de preenchimento de formulário com Cypress. ') //comando utilizado para preencher o campo de mensagem
  cy.get('button[type="submit"]').click() //comando utilizado para clicar no botão de enviar
})