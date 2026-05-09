Feature: Login da aplicação

  Scenario: Login com credenciais válidas
    Given que o usuário possui email e senha válidos
    When enviar uma requisição POST para login
    Then o sistema deve retornar status 200
    And deve retornar um token JWT

  Scenario: Login com senha inválida
    Given que o usuário possui credenciais inválidas
    When enviar uma requisição POST para login inválido
    Then o sistema deve retornar status 401
    And deve retornar mensagem de erro

  Scenario: Login sem preencher campos obrigatórios
    Given que o usuário não informa email e senha
    When enviar requisição sem dados
    Then o sistema deve retornar status 400