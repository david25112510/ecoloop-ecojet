# Roteiro de teste do protótipo RETINTA ECOJET

## Preparação

- Usar um computador e navegador definidos para a sessão e abrir o protótipo por `localhost`.
- Confirmar com a Ecojet quem acompanhará o teste e qual etiqueta está carregada na Zebra GC420.
- Usar somente os nomes e pedidos fictícios já disponíveis ou dados inventados para a sessão. Não registrar informações de clientes reais.
- Fazer o teste de impressão primeiro na prévia do navegador. Imprimir uma etiqueta física somente quando a equipe Ecojet confirmar tamanho e mídia.
- No painel **Regras de pontos**, usar **Restaurar dados de demonstração** antes de cada rodada para começar do mesmo estado.

## Casos de teste

| ID | Ação | Resultado esperado | Situação em 24/11/2026 |
|---|---|---|---|
| T01 | Abrir a área do cliente e verificar saldo, recargas recentes e acesso ao extrato. | Dados demonstrativos aparecem com valores e pontos coerentes. | **Pendente de registro.** As fotos não mostram uma conferência do saldo/histórico na área do cliente. |
| T02 | No painel, ajustar a taxa para 3 pontos por real e salvar. | A simulação de R$ 50 mostra 150 pontos; a taxa continua salva após atualizar a página. | **Parcial.** A taxa inicial 2:1 é compatível com R$ 80 → 160 pontos nas fotos; alteração e persistência da configuração não aparecem. |
| T03 | Cadastrar um novo cliente fictício; depois selecioná-lo no formulário e registrar uma recarga de R$ 50. | O cliente recebe um código próprio; a recarga fica vinculada a ele, calcula 100 pontos na taxa padrão e cria token/QR único. | **Parcial.** Geração de QR e cálculo de pontos são mostrados; cadastro e vínculo no novo histórico individual não foram comprovados. |
| T04 | Tentar confirmar o QR antes de marcar a entrega. | O sistema informa que a entrega ainda não foi confirmada e não credita pontos. | **Pendente de registro.** |
| T05 | Abrir a prévia da etiqueta para a Zebra GC420. | Logo RETINTA ECOJET, identificação do pedido e QR aparecem dentro da etiqueta; tamanho confere com a mídia carregada. | **Parcial.** A tela mostra QR e configuração de 50 × 30 mm; as fotos não comprovam impressão física ou leitura na Zebra. |
| T06 | Marcar a recarga como entregue e confirmar o QR pela conta do cliente correto, usando demonstração ou código manual. | O status muda para pontos creditados e somente o saldo daquele cliente aumenta uma única vez. | **Parcial.** As fotos mostram entrega confirmada e mensagem de 160 pontos adicionados; não registram a leitura do cliente nem isolamento de saldo por perfil. |
| T07 | Tentar ler novamente o mesmo QR. | O sistema bloqueia o segundo crédito e informa que o código já foi utilizado. | **Pendente de registro.** |
| T08 | Conferir o extrato e a área de resgate. | Recarga, pontos, saldo e conversão fixa de 100 pontos = R$ 1 aparecem coerentes. | **Pendente de registro.** |
| T09 | Pesquisar o cliente pelo nome/código e abrir o histórico; verificar quem cadastrou a recarga e quem confirmou a entrega. | A ficha mostra o saldo individual, todos os lançamentos e os nomes dos operadores responsáveis por cada etapa. | **Pendente de registro.** As telas foram adicionadas após as sessões das fotos. |
| T10 | Cadastrar dois operadores, alternar o operador ativo e registrar/entregar uma recarga. | O painel mostra o operador que criou o pedido e quem marcou a entrega, mantendo a autoria de cada etapa. | **Pendente de registro.** As telas foram adicionadas após as sessões das fotos. |
| T11 | Restaurar os dados de demonstração e confirmar a ação. | Aparecem novamente clientes, saldo, taxa, operadores e recargas fictícias iniciais. | **Pendente de registro.** |

## Registro da sessão

- Data e local:
- Participantes e funções:
- Navegador/computador:
- Impressora e mídia confirmadas:
- Casos executados:
- Problemas observados (passos para reproduzir):
- Sugestões da equipe Ecojet:
- Ajustes priorizados e responsável:
- Próxima revisão:

## Encerramento

Após a sessão, registrar observações sem dados pessoais, devolver o navegador ao estado inicial com **Restaurar dados de demonstração** e salvar cópia do registro de teste. A aprovação do protótipo para teste não significa que o armazenamento local seja adequado para uma operação comercial; não cadastrar clientes reais nem conceder descontos reais.
