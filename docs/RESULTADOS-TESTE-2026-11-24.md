# Resultados observados nos testes do protótipo

As observações abaixo foram registradas a partir de três fotos fornecidas pela dupla em 24/11/2026. Uma das fotos mostra a sessão anterior de 23/11/2026. As telas exibem um pedido demonstrativo de cartucho de R$ 80,00, com a taxa de 2 pontos por real.

## Evidências e resultados

| Evidência | O que aparece | Resultado observado |
|---|---|---|
| Sessão de 23/11/2026, aproximadamente 15h25 | Pedido ECO123 para “Mariana”, cartucho de R$ 80,00, 160 pontos previstos, QR Code e medidas de etiqueta 50 × 30 mm. | Cadastro demonstrativo, cálculo e geração/apresentação do QR foram exercitados. A foto não comprova impressão física. |
| Sessão de 24/11/2026, aproximadamente 11h13 | Pedido ECO235 para David Silva de Souza, cartucho de R$ 80,00, 160 pontos previstos, QR Code e aviso de entrega confirmada. | Fluxo de recarga, identificação do pedido, QR e confirmação da entrega foram demonstrados. |
| Sessão de 24/11/2026, aproximadamente 11h15 | Mensagem “Pontos adicionados!” confirma 160 pontos para o pedido ECO235 e o painel mostra 408 pontos emitidos. | Crédito de pontos após a confirmação foi demonstrado. |

As fotos originais foram mantidas localmente em `ECOLOOP/private-assets/evidencias-testes-2026-11-24/`, fora do repositório público, pois mostram a tela de trabalho e dados identificáveis. Arquivos: `01-geracao-de-qr-23-11.jpeg`, `02-qr-e-entrega.jpeg` e `03-credito-de-pontos.jpeg`.

## O que ainda não foi comprovado pelas fotos

- Impressão física e leitura do QR diretamente na etiqueta Zebra GC420.
- Bloqueio de uma segunda leitura do mesmo QR.
- Pesquisa de clientes, consulta de saldos e históricos por pessoa.
- Registro de operador responsável pelo cadastro e pela confirmação da entrega.
- Resgate demonstrativo e conferência do extrato por cliente.

Esses itens devem ser executados e anotados no [`ROTEIRO-DE-TESTES.md`](ROTEIRO-DE-TESTES.md). O teste observado usou um nome identificável na interface; para novas sessões, utilizar somente dados fictícios. O armazenamento atual é local e não possui autenticação ou controles adequados para dados reais.
