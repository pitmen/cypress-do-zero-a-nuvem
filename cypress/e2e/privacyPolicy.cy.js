it.only('testa a página da política de privacidade de forma independente', function(){
    cy.visit('./src/privacy.html')
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
    cy.contains('Talking About Testing').should('be.visible')
})
