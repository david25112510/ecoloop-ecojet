# Dados, privacidade e segurança

## Dados usados na demonstração

O protótipo inclui um perfil e quatro recargas fictícias para que as telas não apareçam vazias. Ao criar outra recarga, o navegador guarda nome informado, categoria do item, valor, data, status, token e pontuação estimada no `localStorage` desse navegador.

Os dados de demonstração não devem ser interpretados como clientes ou pedidos reais. Evite inserir nome, telefone, endereço, pedido ou informação comercial real.

## Riscos da versão local

- Qualquer pessoa com acesso ao navegador pode ler ou alterar os dados locais.
- Não há login, autorização por perfil ou separação entre usuários.
- O botão de painel Ecojet apenas alterna telas; não cria uma sessão administrativa.
- Os pontos e resgates são calculados no cliente, sem validação do servidor.
- O QR contém token de demonstração; ele não é uma credencial segura para uso real.
- As bibliotecas externas fazem solicitações à internet para os domínios que as hospedam.

## Recomendações para evolução

- Não persistir saldo como único registro financeiro; manter lançamentos imutáveis e auditáveis.
- Validar o pedido e o estado de entrega no servidor antes de creditar.
- Proteger ações administrativas com autenticação, autorização e trilha de auditoria.
- Aplicar idempotência para impedir crédito em leituras simultâneas ou repetidas.
- Evitar dados pessoais no conteúdo do QR; usar identificador opaco, curto e revogável.
- Definir minimização, finalidade, base legal, prazo de retenção e canal de atendimento antes de cadastrar clientes.
- Manter segredos fora do repositório e utilizar HTTPS em qualquer implantação.

Este documento é uma orientação de prototipação, não uma avaliação jurídica ou uma certificação de segurança.
