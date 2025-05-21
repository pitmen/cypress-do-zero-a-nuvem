describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html') //comando utilizado para acessar a página (máquina local)
  })

  it('Verifica o título da aplicação', () => {
    //cy.visit('./src/index.html') //comando utilizado para acessar a página (máquina local)
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT') //comando utilizado para verificar o título da página
  })

  it('Preenche os campos obrigatórios e envia o formulário', () => {
    cy.clock() //comando utilizado para congelar o relógio do navegador 

    //const longText = 'Teste de preenchimento de formulário com Cypress.\n'.repeat(5) //comando utilizado para preencher o campo de mensagem
    const longText = Cypress._.repeat('Teste de preenchimento de formulário com Cypress.\n', 5) //comando utilizado para preencher o campo de mensagem
    cy.get('#firstName').type('Pitter') //comando utilizado para preencher o campo de nome
    cy.get('#lastName').type('Mendes Lacerda') //comando utilizado para preencher o campo de sobrenome
    cy.get('#email').type('pitter-puk@hotmail.com') //comando utilizado para preencher o campo de email
    //cy.get('#open-text-area').type('Teste de preenchimento de formulário com Cypress. ') //comando utilizado para preencher o campo de mensagem
    cy.get('#open-text-area').type(longText, { delay: 0 }) //comando utilizado para preencher o campo de mensagem
    //cy.get('button[type="submit"]').click() //comando utilizado para clicar no botão de enviar
    cy.contains('button', 'Enviar').click() //comando utilizado para clicar no botão de enviar
    
    cy.get('.success').should('be.visible') //comando utilizado para verificar se a mensagem de sucesso foi exibida

    cy.tick(3000) //comando utilizado para avançar o relógio do navegador em 3 segundos
    cy.get('.success').should('not.be.visible') //comando utilizado para verificar se a mensagem de sucesso foi exibida

  })

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.clock() //comando utilizado para congelar o relógio do navegador 

    cy.get('#firstName').type('Pitter') //comando utilizado para preencher o campo de nome
    cy.get('#lastName').type('Mendes Lacerda') //comando utilizado para preencher o campo de sobrenome
    cy.get('#email').type('pitter-puk@hotmail,com') //comando utilizado para preencher o campo de email com formatação inválida
    cy.get('#open-text-area').type('Teste de preenchimento de formulário com Cypress. ') //comando utilizado para preencher o campo de mensagem
    cy.contains('button', 'Enviar').click() //comando utilizado para clicar no botão de enviar
    
    cy.get('.error').should('be.visible') //comando utilizado para verificar se a mensagem de erro foi exibida

    cy.tick(3000) //comando utilizado para avançar o relógio do navegador em 3 segundos
    cy.get('.success').should('not.be.visible') //comando utilizado para verificar se a mensagem de sucesso foi exibida

  })

  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock() //comando utilizado para congelar o relógio do navegador

    cy.get('#firstName').type('Pitter') //comando utilizado para preencher o campo de nome
    cy.get('#lastName').type('Mendes Lacerda') //comando utilizado para preencher o campo de sobrenome
    cy.get('#email').type('pitter-puk@hotmail,com') //comando utilizado para preencher o campo de email com formatação inválida
    cy.get('#open-text-area').type('Teste de preenchimento de formulário com Cypress. ') //comando utilizado para preencher o campo de mensagem
    cy.get('#phone-checkbox').click() //comando utilizado para marcar o checkbox de telefone
    cy.get('button[type="submit"]').click() //comando utilizado para clicar no botão de enviar
    //cy.contains('button', 'Enviar').click() //comando utilizado para clicar no botão de enviar

    cy.get('.error').should('be.visible') //comando utilizado para verificar se a mensagem de erro foi exibida

    cy.tick(3000) //comando utilizado para avançar o relógio do navegador em 3 segundos
    cy.get('.success').should('not.be.visible') //comando utilizado para verificar se a mensagem de sucesso foi exibida
  })

  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário 2', () => {
    cy.clock() //comando utilizado para congelar o relógio do navegador

    cy.get('#firstName').type('Pitter') //comando utilizado para preencher o campo de nome
    cy.get('#lastName').type('Mendes Lacerda') //comando utilizado para preencher o campo de sobrenome
    cy.get('#email').type('pitter-puk@hotmail,com') //comando utilizado para preencher o campo de email com formatação inválida
    cy.get('#open-text-area').type('Teste de preenchimento de formulário com Cypress. ') //comando utilizado para preencher o campo de mensagem
    cy.get('#phone-checkbox').check() //comando utilizado para marcar o checkbox de telefone
    //cy.get('button[type="submit"]').click() //comando utilizado para clicar no botão de enviar
    cy.contains('button', 'Enviar').click() //comando utilizado para clicar no botão de enviar

    cy.get('.error').should('be.visible') //comando utilizado para verificar se a mensagem de erro foi exibida

    cy.tick(3000) //comando utilizado para avançar o relógio do navegador em 3 segundos
    cy.get('.success').should('not.be.visible') //comando utilizado para verificar se a mensagem de sucesso foi exibida
  })

  it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Pitter')
      .should('have.value', 'Pitter')
      .clear()
      .should('have.value', '') //comando utilizado para preencher o campo de nome
    cy.get('#lastName').type('Mendes Lacerda').should('have.value', 'Mendes Lacerda').clear().should('have.value', '') //comando utilizado para preencher o campo de sobrenome
    cy.get('#email').type('pitter-pukhotmail.com').should('have.value', 'pitter-pukhotmail.com').clear().should('have.value', '') //comando utilizado para preencher o campo de email
    cy.get('#phone').type('11948580867').should('have.value', '11948580867').clear().should('have.value', '').clear().should('have.value', '') //comando utilizado para preencher o campo de telefone
  })

  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.clock() //comando utilizado para congelar o relógio do navegador

    //cy.get('button[type="submit"]').click() //comando utilizado para clicar no botão de enviar
    cy.contains('button', 'Enviar').click() //comando utilizado para clicar no botão de enviar

    cy.get('.error').should('be.visible') //comando utilizado para verificar se a mensagem de erro foi exibida

    cy.tick(3000) //comando utilizado para avançar o relógio do navegador em 3 segundos
    cy.get('.success').should('not.be.visible') //comando utilizado para verificar se a mensagem de sucesso foi exibida
  })

  it('Envia o formulário com sucesso usando um comando customizado 1', () => {
    cy.clock() //comando utilizado para congelar o relógio do navegador

    cy.fillMandatoryFieldsAndSubmitOld1() //comando utilizado para preencher os campos obrigatórios e enviar o formulário
    
    cy.get('.success').should('be.visible') //comando utilizado para verificar se a mensagem de sucesso foi exibida

    cy.tick(3000) //comando utilizado para avançar o relógio do navegador em 3 segundos
    cy.get('.success').should('not.be.visible') //comando utilizado para verificar se a mensagem de sucesso foi exibida
  })

  it('Envia o formulário com sucesso usando um comando customizado 2', () => {
    cy.clock() //comando utilizado para congelar o relógio do navegador

    const data = {
      firstName: 'Pitter',
      lastName: 'Mendes Lacerda',
      email: 'pitter-puk@hotmail.com',
      phone: '11948580867',
      text: 'Teste de preenchimento de formulário com Cypress.'

    }

    cy.fillMandatoryFieldsAndSubmitOld2(data) //comando utilizado para preencher os campos obrigatórios e enviar o formulário
    
    cy.get('.success').should('be.visible') //comando utilizado para verificar se a mensagem de sucesso foi exibida

    cy.tick(3000) //comando utilizado para avançar o relógio do navegador em 3 segundos
    cy.get('.success').should('not.be.visible') //comando utilizado para verificar se a mensagem de sucesso foi exibida
  })

  it('Envia o formulário com sucesso usando um comando customizado 3', () => {
    cy.clock() //comando utilizado para congelar o relógio do navegador

    cy.fillMandatoryFieldsAndSubmit() //comando utilizado para preencher os campos obrigatórios e enviar o formulário
    
    cy.get('.success').should('be.visible') //comando utilizado para verificar se a mensagem de sucesso foi exibida

    cy.tick(3000) //comando utilizado para avançar o relógio do navegador em 3 segundos
    cy.get('.success').should('not.be.visible') //comando utilizado para verificar se a mensagem de sucesso foi exibida
  })

  it('Seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube') //comando utilizado para selecionar um produto por seu texto
      .should('have.value', 'youtube') 
  })

  it('Seleciona um produto (Mentoria) por seu valor', () => {
    cy.get('#product')
      .select('mentoria') //comando utilizado para selecionar um produto por seu valor
      .should('have.value', 'mentoria') 
  })

  it('Seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1) //comando utilizado para selecionar um produto por seu índice
      .should('have.value', 'blog')
  })

  it('Marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check() //comando utilizado para marcar o "check" para tipo de atendimento "Feedback"
      //.should('have.value', 'feedback')
      .should('be.checked') //comando utilizado para verificar se o "check" foi marcado
  })

  it('Marca cada tipo de atendimento 1', () => {
    cy.get('input[type="radio"]')
      .should('have.length', 3) //comando utilizado para verificar se existem 3 tipos de atendimento
      .each(($radio) => {
        cy.wrap($radio).check() //comando utilizado para marcar o "check" para cada tipo de atendimento
        cy.wrap($radio).should('be.checked') //comando utilizado para verificar se o "check" foi marcado
      })
  })
  
  it('Marca cada tipo de atendimento 2', () => {
    cy.get('input[type="radio"]')
      .each((typeOfService) => {
        cy.wrap(typeOfService).check() //comando utilizado para marcar o "check" para cada tipo de atendimento
        cy.wrap(typeOfService).should('be.checked') //comando utilizado para verificar se o "check" foi marcado
      })
  })

  it('Marca ambos os checkboxes, depois desmarca o último', () => {
    //cy.get('#email-checkbox').check() //comando utilizado para marcar o "check" para ambos os checkboxes
    //cy.get('#phone-checkbox').check() //comando utilizado para marcar o "check" para ambos os checkboxes
    cy.get('input[type="checkbox"]')
      .check() //comando utilizado para marcar o "check" para ambos os checkboxes
      .should('be.checked') //comando utilizado para verificar se o "check" foi marcado
      .last()
      .uncheck() //comando utilizado para desmarcar o "check" do último checkbox
      .should('not.be.checked') //comando utilizado para verificar se o "check" foi desmarcado
  })

  it('Seleciona um arquivo da pasta fixtures', () => {
    //cy.get('input[type="file"]')
    cy.get('#file-upload')
      .should('not.have.value') //comando utilizado para verificar se o campo de arquivo está vazio
      .selectFile('./cypress/fixtures/example.json') //comando utilizado para selecionar um arquivo da pasta fixtures
      .should((input) => {
        console.log(input) //comando utilizado para verificar se o arquivo foi selecionado
        //console.log(input[0].files[0].name)
        expect(input[0].files[0].name).to.equal('example.json') //comando utilizado para verificar se o arquivo foi selecionado
      })
  })

  it('Seleciona um arquivo simulando um drag-and-drop', () => {
    //cy.get('input[type="file"]')
    cy.get('#file-upload')
      .should('not.have.value') //comando utilizado para verificar se o campo de arquivo está vazio
      .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' }) //comando utilizado para simular que um usuario esta arrastando um arquivo da pasta fixtures
      .should((input) => {
        console.log(input) //comando utilizado para verificar se o arquivo foi selecionado
        //console.log(input[0].files[0].name)
        expect(input[0].files[0].name).to.equal('example.json') //comando utilizado para verificar se o arquivo foi selecionado
      })
  })

  it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile') //comando utilizado para dar um alias para o arquivo da pasta fixtures
    cy.get('#file-upload')
      .selectFile('@sampleFile') //comando utilizado para selecionar o arquivo utilizando o alias
      .should((input) => {
        //console.log(input) //comando utilizado para verificar se o arquivo foi selecionado
        //console.log(input[0].files[0].name)
        expect(input[0].files[0].name).to.equal('example.json') //comando utilizado para verificar se o arquivo foi selecionado
      })
  })

  it('Verifica que a política de privacidade abre em outra aba sem precisar de um clique', () => {
    cy.get('#privacy a')
    .should('have.attr', 'target', '_blank') //comando utilizado para verificar se o link da política de privacidade abre em outra aba sem precisar de um clique
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html') //comando utilizado para verificar se o link da política de privacidade é o correto
      .and('have.attr', 'target', '_blank') //comando utilizado para verificar se o link da política de privacidade abre em outra aba sem precisar de um clique
  })


  it('Acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target') //comando utilizado para remover o atributo target do link
      .click() //comando utilizado para clicar no link

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible') //comando utilizado para verificar se o título da página é o correto
  }) // esta ficando em loop

it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
  cy.get('.success') 
    .should('not.be.visible') // mensagem de sucesso não deve estar visível
    .invoke('show') // mostra a mensagem de sucesso
    .should('be.visible') // mensagem de sucesso deve estar visível
    .and('contain', 'Mensagem enviada com sucesso.') // verifica se a mensagem de sucesso contém o texto correto
    .invoke('hide') // esconde a mensagem de sucesso
    .should('not.be.visible') // mensagem de sucesso não deve estar visível
    
  cy.get('.error') // mensagem de erro não deve estar visível
    .should('not.be.visible') // mensagem de erro não deve estar visível
    .invoke('show') // mostra a mensagem de erro
    .should('be.visible') // mensagem de erro deve estar visível
    .and('contain', 'Valide os campos obrigatórios!') //  verifica se a mensagem de erro contém o texto correto
    .invoke('hide') // esconde a mensagem de erro
    .should('not.be.visible') // mensagem de erro não deve estar visível
})

  it('Preenche o campo da area de texto usando o comando invoke', () => {
    //const longText = Cypress._.repeat('Teste de preenchimento de formulário com Cypress.\n', 5) //comando utilizado para preencher o campo de mensagem
    cy.get('#open-text-area')
      .invoke('val', 'Um texto qualquer') //comando utilizado para preencher a área de texto
      //.should('have.value', longText) //comando utilizado para verificar se a área de texto foi preenchida corretamente
      .should('have.value', 'Um texto qualquer') //comando utilizado para verificar se a área de texto foi preenchida corretamente
  })

  it('F  az uma requisição HTTP', () => {
    cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
      .as('getRequest') //comando utilizado para fazer uma requisição HTTP
      .its('status') //comando utilizado para verificar o status da requisição
      .should('be.equal', 200) //comando utilizado para verificar se o status da requisição é 200
    cy.get('@getRequest')
      .its('statusText') //comando utilizado para verificar o status da requisição
      .should('be.equal', 'OK')
    cy.get('@getRequest')
      .its('body') //comando utilizado para verificar o status da requisição
      .should('include', 'CAC TAT') //comando utilizado para verificar se o corpo da requisição contém o texto 'CAC TAT'
      /*.then((response) => {
        const { status, statusText, body } = response
        console.log({ status, statusText, body })
        expect(status).to.equal(200)
        expect(statusText).to.equal('OK')
        expect(body).to.include('CAC TAT')*/
      })

    it('Encontra o gato escondido', () => {
      cy.get('#cat')
        .invoke('show')
        .should('be.visible') //comando utilizado para verificar se o gato está visível
        .invoke('hide')
        .should('not.be.visible') //comando utilizado para verificar se o gato não está visível
    })

    it('Encontra o gato escondido versão 2', () => {
      cy.get('#cat')
        .invoke('show')
        .should('be.visible') //comando utilizado para verificar se o gato está visível
      cy.get('#title')
        .invoke('text', 'CAT TAT') //comando utilizado para verificar se o título é o correto
        .should('have.text', 'CAT TAT') //comando utilizado para verificar se o título é o correto
      cy.get('#subtitle')
        .invoke('text', 'Eu 💙 gatos') //comando utilizado para verificar se o subtítulo é o correto
        .should('have.text', 'Eu 💙 gatos') //comando utilizado para verificar se o subtítulo é o correto
    })

})

