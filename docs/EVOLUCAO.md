# Plano sugerido de evolução

Esta lista organiza discussões futuras. Não representa trabalho já concluído nem decisão da Ecojet.

## Etapa 1 — Validar a proposta

- Apresentar o fluxo e os parâmetros de pontos à Ecojet.
- Confirmar como se registra a recarga e como se comprova a entrega.
- Definir benefício, limites, estornos, validade e atendimento a exceções.
- Anotar comentários e decisões sem tratar silêncio como aprovação.

## Etapa 2 — Refinar experiência e requisitos

- Escolher quais perfis e telas farão parte do primeiro piloto.
- Desenhar cadastro, autenticação e recuperação de acesso.
- Detalhar regras para pedidos cancelados, devolvidos, incompletos e repetidos.
- Mapear informações pessoais estritamente necessárias.

## Etapa 3 — Construir base de produto

- Selecionar backend, banco de dados e hospedagem adequados.
- Implementar login e autorização para cliente e equipe.
- Registrar pontos em livro razão auditável, com operações idempotentes.
- Emitir e validar QR Codes no servidor; não confiar em pontuação calculada só no navegador.
- Integrar com entrega e caixa após disponibilidade das interfaces autorizadas.

## Etapa 4 — Verificar e pilotar

- Validar acessibilidade, usabilidade em celulares e operação sem conexão.
- Fazer revisão de segurança e privacidade antes de usar dados reais.
- Ensaiar cenários de duplicidade, fraude, estorno e falha na entrega.
- Executar piloto pequeno autorizado, coletar retorno e medir adesão e recargas repetidas.

## Critério de passagem

Não usar dados reais ou oferecer descontos reais até que a Ecojet aprove as regras, a implementação e os responsáveis operacionais, e que os controles técnicos adequados estejam disponíveis.
