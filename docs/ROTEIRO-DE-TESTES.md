# Roteiro de teste do protótipo RETINTA ECOJET

## Preparação

**Status:** a dupla informa que a Ecojet realizou a rodada final, aprovou as funções do protótipo e confirmou o teste do histórico de clientes e da impressão física na Zebra GC420. O roteiro abaixo permanece como registro detalhado para documentação; a atualização recebida não discriminou horário, mídia usada ou resultado de cada caso individual.

- Usar um computador e navegador definidos para a sessão e abrir o protótipo por `localhost`.
- Confirmar com a Ecojet quem acompanhará o teste e qual etiqueta está carregada na Zebra GC420.
- Usar somente os nomes e pedidos fictícios já disponíveis ou dados inventados para a sessão. Não registrar informações de clientes reais.
- Fazer o teste de impressão primeiro na prévia do navegador. Imprimir uma etiqueta física somente quando a equipe Ecojet confirmar tamanho e mídia.
- No painel **Regras de pontos**, usar **Restaurar dados de demonstração** antes de cada rodada para começar do mesmo estado.

## Casos de teste

| ID | Ação | Resultado esperado | Situação em 24/11/2026 |
|---|---|---|---|
| T01 | Abrir a área do cliente e verificar saldo, recargas recentes e acesso ao extrato. | Dados demonstrativos aparecem com valores e pontos coerentes. | A dupla relata que o sistema e o histórico foram testados e aprovados pela Ecojet. |
| T02 | No painel, ajustar a taxa para 3 pontos por real e salvar. | A simulação de R$ 50 mostra 150 pontos; a taxa continua salva após atualizar a página. | A dupla relata aprovação do funcionamento do protótipo; o registro recebido não detalha esta configuração isoladamente. |
| T03 | Cadastrar um novo cliente fictício; depois selecioná-lo no formulário e registrar uma recarga de R$ 50. | O cliente recebe um código próprio; a recarga fica vinculada a ele, calcula 100 pontos na taxa padrão e cria token/QR único. | A dupla relata aprovação do sistema; o registro recebido não detalha este caso isoladamente. |
| T04 | Tentar confirmar o QR antes de marcar a entrega. | O sistema informa que a entrega ainda não foi confirmada e não credita pontos. | A dupla relata aprovação do sistema; o registro recebido não detalha este caso isoladamente. |
| T05 | Abrir a prévia da etiqueta para a Zebra GC420. | Logo RETINTA ECOJET, identificação do pedido e QR aparecem dentro da etiqueta; tamanho confere com a mídia carregada. | **Impressão física na Zebra GC420 testada e aprovada**, segundo a dupla. A etiqueta/media específica ainda não foi anotada neste registro. |
| T06 | Marcar a recarga como entregue e confirmar o QR pela conta do cliente correto, usando demonstração ou código manual. | O status muda para pontos creditados e somente o saldo daquele cliente aumenta uma única vez. | A dupla relata que o sistema funcionou e foi aprovado pela Ecojet; detalhes do caso não foram discriminados. |
| T07 | Tentar ler novamente o mesmo QR. | O sistema bloqueia o segundo crédito e informa que o código já foi utilizado. | A dupla relata aprovação geral do protótipo; registrar o passo a passo deste caso se for necessário para a homologação de produção. |
| T08 | Conferir o extrato e a área de resgate. | Recarga, pontos, saldo e conversão fixa de 100 pontos = R$ 1 aparecem coerentes. | **Histórico/saldo testados e aprovados**, segundo a dupla; o registro recebido não detalha o resgate isoladamente. |
| T09 | Pesquisar o cliente pelo nome/código e abrir o histórico; verificar quem cadastrou a recarga e quem confirmou a entrega. | A ficha mostra o saldo individual, todos os lançamentos e os nomes dos operadores responsáveis por cada etapa. | **Histórico de clientes testado e aprovado**, segundo a dupla. |
| T10 | Cadastrar dois operadores, alternar o operador ativo e registrar/entregar uma recarga. | O painel mostra o operador que criou o pedido e quem marcou a entrega, mantendo a autoria de cada etapa. | A dupla relata que todas as funções do sistema foram aprovadas; o caso de operadores não foi discriminado separadamente. |
| T11 | Restaurar os dados de demonstração e confirmar a ação. | Aparecem novamente clientes, saldo, taxa, operadores e recargas fictícias iniciais. | A dupla relata que o protótipo funcionou; o registro recebido não detalha esta ação isoladamente. |

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

A rodada do protótipo foi aprovada pela Ecojet, conforme atualização da dupla em 24/11/2026. Para uma homologação de produção, manter registro por caso, identificar impressora e mídia e documentar eventuais problemas e correções. O protótipo continua usando armazenamento local e não deve receber dados reais nem conceder descontos reais antes da construção e aprovação da versão operacional.
