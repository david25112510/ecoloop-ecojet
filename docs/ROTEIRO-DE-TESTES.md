# Roteiro de teste do protótipo RETINTA ECOJET

## Preparação

- Usar um computador e navegador definidos para a sessão e abrir o protótipo por `localhost`.
- Confirmar com a Ecojet quem acompanhará o teste e qual etiqueta está carregada na Zebra GC420.
- Usar somente os nomes e pedidos fictícios já disponíveis ou dados inventados para a sessão. Não registrar informações de clientes reais.
- Fazer o teste de impressão primeiro na prévia do navegador. Imprimir uma etiqueta física somente quando a equipe Ecojet confirmar tamanho e mídia.
- No painel **Regras de pontos**, usar **Restaurar dados de demonstração** antes de cada rodada para começar do mesmo estado.

## Casos de teste

| ID | Ação | Resultado esperado | Resultado/observações |
|---|---|---|---|
| T01 | Abrir a área do cliente e verificar saldo, recargas recentes e acesso ao extrato. | Dados demonstrativos aparecem com valores e pontos coerentes. | |
| T02 | No painel, ajustar a taxa para 3 pontos por real e salvar. | A simulação de R$ 50 mostra 150 pontos; a taxa continua salva após atualizar a página. | |
| T03 | Registrar uma recarga fictícia de R$ 50 e abrir os detalhes. | São calculados 150 pontos e criado um token/QR único com status aguardando entrega. | |
| T04 | Tentar confirmar o QR antes de marcar a entrega. | O sistema informa que a entrega ainda não foi confirmada e não credita pontos. | |
| T05 | Abrir a prévia da etiqueta para a Zebra GC420. | Logo RETINTA ECOJET, identificação do pedido e QR aparecem dentro da etiqueta; tamanho confere com a mídia carregada. | |
| T06 | Marcar a recarga como entregue e confirmar o QR pelo modo de demonstração ou código manual. | O status muda para pontos creditados e o saldo aumenta uma única vez. | |
| T07 | Tentar ler novamente o mesmo QR. | O sistema bloqueia o segundo crédito e informa que o código já foi utilizado. | |
| T08 | Conferir o extrato e a área de resgate. | Recarga, pontos, saldo e conversão fixa de 100 pontos = R$ 1 aparecem coerentes. | |
| T09 | Restaurar os dados de demonstração e confirmar a ação. | Aparecem novamente o saldo, a taxa e as recargas fictícias iniciais. | |

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
