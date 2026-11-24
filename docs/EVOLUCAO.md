# Plano sugerido de evolução

Esta lista organiza discussões futuras. Não representa trabalho já concluído nem decisão da Ecojet.

## Etapa 1 — Proposta aprovada

Concluída em 24/11/2026: a Ecojet validou a proposta, aprovou o protótipo para teste e confirmou o nome RETINTA ECOJET após consulta. Isso não significa autorização para operação comercial.

## Etapa 2 — Testar e refinar o protótipo

- Executar roteiro de testes atualizado, incluindo cadastro/histórico de clientes e autoria por operador.
- Completar a verificação de QR repetido, extrato/resgate demonstrativo e responsividade.
- Validar a prévia e, com a Ecojet, a impressão física na Zebra GC420.
- Coletar retorno da equipe Ecojet e registrar os ajustes acordados.
- Confirmar quais perfis e telas compõem o protótipo aprovado para teste.

## Etapa 3 — Definir operação real, caso venha a ser planejada

- Detalhar regras para pedidos cancelados, devolvidos, incompletos e repetidos.
- Mapear informações pessoais estritamente necessárias.

## Etapa 4 — Construir base de produto (fora do escopo do protótipo acadêmico)

- Selecionar backend, banco de dados e hospedagem adequados.
- Implementar login e autorização para cliente e equipe.
- Registrar pontos em livro razão auditável, com operações idempotentes.
- Emitir e validar QR Codes no servidor; não confiar em pontuação calculada só no navegador.
- Validar a impressão física da etiqueta na GC420 local: variante do equipamento, tamanho e tipo de mídia, driver, calibração, contraste e leitura do QR.
- Integrar com entrega e caixa após disponibilidade das interfaces autorizadas.

## Etapa 5 — Verificar e pilotar (depende de decisão da Ecojet)

- Validar acessibilidade, usabilidade em celulares e operação sem conexão.
- Fazer revisão de segurança e privacidade antes de usar dados reais.
- Ensaiar cenários de duplicidade, fraude, estorno e falha na entrega.
- Executar piloto pequeno autorizado, coletar retorno e medir adesão e recargas repetidas.

## Critério de passagem

Não usar dados reais ou oferecer descontos reais até que a Ecojet aprove as regras, a implementação e os responsáveis operacionais, e que os controles técnicos adequados estejam disponíveis.
