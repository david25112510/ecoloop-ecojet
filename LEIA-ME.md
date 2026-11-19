# Protótipo ECOLOOP

Protótipo navegável do programa de pontos proposto para a Ecojet, desenvolvido para apoiar o PEI I.

## Abrir

Abra `index.html` em um navegador. A primeira abertura usa dados ilustrativos para demonstrar a área do cliente. As alterações ficam salvas no armazenamento local do navegador usado.

Para testar a leitura por câmera, abra a pasta servida em `localhost` ou em um endereço HTTPS e permita o acesso à câmera. Se a leitura por câmera não estiver disponível, use a opção de simulação ou informe o código único manualmente.

## Fluxo disponível

1. No **Painel Ecojet**, registre cliente, tipo de suprimento e valor da recarga.
2. O sistema calcula os pontos pela taxa configurada e cria um código exclusivo para o pedido.
3. Abra **Ver QR / detalhes** e marque a entrega como concluída.
4. Simule a leitura pelo cliente ou informe o código. Os pontos só entram no saldo após a entrega; cada QR pode ser usado uma vez.
5. Na **Área do cliente**, consulte saldo, extrato e faça um resgate demonstrativo.
6. Em **Regras de pontos**, ajuste os pontos por real. A conversão de resgate permanece fixa em 100 pontos por R$ 1,00.

## Limites desta versão

- Os dados de exemplo são fictícios e ficam apenas no navegador local.
- O QR Code é gerado com uma biblioteca carregada por CDN; é necessária conexão com a internet para exibi-lo.
- O resgate é demonstrativo; não gera cupom nem integra com caixa, pedidos, estoque ou entregas da Ecojet.
- Não há login, servidor, banco de dados ou integração de produção. O painel é uma simulação sem autenticação.
- Os valores de conversão e as regras precisam ser validados pela Ecojet antes de qualquer uso real.
