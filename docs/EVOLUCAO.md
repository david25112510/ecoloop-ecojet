# Próximas fases do RETINTA ECOJET

## Situação atual — 24/11/2026

A Ecojet validou o projeto, testou e aprovou o protótipo. Segundo a atualização da dupla, o histórico de clientes e a impressão física na Zebra GC420 foram testados com sucesso, o sistema funcionou e a empresa informou que pretende implantá-lo na prática. A implantação ainda é uma etapa futura: não há cronograma, arquitetura de produção ou entrada em operação confirmados neste registro.

## Fases propostas para sair do protótipo e chegar à operação

As etapas abaixo organizam o trabalho futuro. Devem ser planejadas com a Ecojet; não são datas nem compromissos já definidos.

### 1. Formalizar os requisitos e as regras do programa

- Confirmar quais serviços e valores geram pontos, taxa de acúmulo, conversão e limites de resgate.
- Definir identificação e consentimento do cliente, validade dos pontos e tratamento de cancelamento, devolução, correção e entrega parcial.
- Descrever responsabilidades dos operadores, da equipe de entrega e do suporte.
- Aprovar o texto final do regulamento e as mensagens exibidas ao cliente.

### 2. Planejar a solução de produção

- Escolher servidor, banco de dados, hospedagem e integrações com os processos da Ecojet.
- Definir autenticação, perfis de acesso, recuperação de conta e trilha de auditoria.
- Planejar proteção de dados, cópias de segurança, monitoramento e resposta a incidentes.
- Definir como o QR será emitido, validado e consumido uma única vez no servidor.

### 3. Desenvolver e integrar a versão operacional

- Implementar as telas e regras aprovadas com dados persistidos no servidor.
- Integrar clientes, recargas, entregas, saldo e extrato a uma fonte central e auditável.
- Configurar a impressão local na Zebra GC420 usada pela Ecojet, validando driver, mídia, dimensões e legibilidade.
- Fazer as integrações autorizadas com pedidos, caixa ou logística, se forem necessárias e houver interfaces disponíveis.

### 4. Fazer homologação com a Ecojet

- Repetir os fluxos com contas de teste e verificar leitura única do QR, histórico, operador, estornos e falhas de entrega.
- Validar uso em celular e computador, conexão instável, recuperação de falhas e impressão em condições reais.
- Registrar aceite, problemas encontrados e responsáveis pela correção antes de liberar para clientes.

### 5. Executar um piloto controlado

- Treinar a equipe e definir um grupo inicial, duração, suporte e canal para dúvidas.
- Acompanhar geração de pontos, resgates, erros, solicitações de clientes e recargas repetidas.
- Ajustar regras e interface a partir dos dados e do retorno dos participantes.

### 6. Decidir a implantação e acompanhar resultados

- Com base no piloto, a Ecojet decide se amplia o programa e define quando e como fazê-lo.
- Monitorar indicadores acordados, como participação, recargas, resgates, recorrência e falhas.
- Avaliar eventual efeito ambiental com uma metodologia definida; não presumir redução de resíduos sem medição.

## Limite entre protótipo e produção

O protótipo atual é uma demonstração local com armazenamento no navegador. A aprovação e o teste bem-sucedido validam a proposta e seu fluxo demonstrativo; não significam que esta versão já esteja hospedada, integrada ou pronta para armazenar dados e conceder benefícios reais. A passagem para cada fase depende das decisões, recursos e aprovações da Ecojet.
