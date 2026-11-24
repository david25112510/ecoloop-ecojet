# Arquitetura do protótipo

## Visão geral atual

O protótipo é uma aplicação web estática, sem etapa de compilação:

| Arquivo | Responsabilidade |
|---|---|
| `index.html` | Estrutura das telas, formulários, tabelas e diálogos |
| `styles.css` | Cores, tipografia, componentes e adaptação para celular |
| `app.js` | Navegação, demonstração de regras, atualização das telas e armazenamento local |
| `assets/retinta-ecojet-logo.png` | Estudo de marca exibido no menu |

O HTML carrega `QRCode.js` por CDN para desenhar os QR Codes. A câmera utiliza a API `BarcodeDetector` quando disponível. Por compatibilidade, há entrada manual do token. A impressão usa a caixa de impressão do navegador e o driver local da Zebra GC420.

## Fluxo técnico de uma recarga

1. O formulário cria um registro no navegador e calcula os pontos previstos com a taxa atual.
2. Um token aleatório acompanha o registro; o token é usado como conteúdo do QR.
3. A equipe revisa as dimensões da etiqueta e solicita a impressão no navegador; o operador escolhe a Zebra GC420 instalada e verifica as preferências do driver.
4. A etiqueta impressa acompanha o pedido até o cliente.
5. A equipe marca a recarga como entregue.
6. O leitor obtém o token e procura a recarga salva localmente.
7. Se a recarga foi entregue e ainda não foi pontuada, o estado muda para creditado e o saldo aumenta.
8. O estado atualizado é escrito em `localStorage` e as telas são redesenhadas.

## Armazenamento

`localStorage` mantém a taxa, o saldo demonstrativo, as recargas e os resgates no navegador e perfil usados. Não sincroniza entre aparelhos ou pessoas. Os registros de exemplo são carregados quando não existe estado salvo.

## Dependências externas

- `qrcodejs` via jsDelivr: geração visual do QR Code.
- Google Fonts: fontes Manrope e DM Sans.

Sem internet, a interface principal continua disponível, mas QR e fontes externas podem não carregar. O token pode ser digitado no protótipo.

## Impressão na Zebra GC420

O botão **Imprimir etiqueta na Zebra GC420** cria uma etiqueta com QR, referência do pedido, pontos previstos e token, sem nome ou telefone do cliente. As dimensões são editáveis e o padrão demonstrativo é 50 × 30 mm; o leiaute atual aceita 45–108 mm de largura e 26–250 mm de altura. Confirme a medida física da etiqueta antes de imprimir. A aplicação invoca `window.print()` e deixa a seleção da Zebra ao usuário no diálogo nativo do navegador. Não usa ZPL/EPL diretamente, não envia trabalhos silenciosos e não detecta o status da impressora.

O driver e a impressora precisam estar instalados/configurados na máquina do operador, com tamanho, tipo e sensor de mídia compatíveis. Em implantação, validar se a empresa usa GC420d ou GC420t, configurar o driver e testar legibilidade do QR no tamanho real do rolo.

## Arquitetura recomendada para uma versão real

```mermaid
flowchart LR
  C[Aplicação do cliente] --> API[API com autenticação]
  O[Painel operacional] --> API
  API --> DB[(Banco de dados)]
  API --> Q[Serviço de QR / confirmação]
  API --> E[Integração com pedido e entrega]
  API --> P[Integração com caixa ou desconto]
  API --> L[Trilha de auditoria]
```

Essa arquitetura é apenas uma direção para estudo. A Ecojet e a equipe do projeto devem escolher plataformas, integrações, hospedagem e controles após levantamento de requisitos.

## Decisões necessárias antes de produção

- Estratégia de autenticação e recuperação de conta.
- Identificação do pedido e integração com o evento de entrega.
- Emissão e validação do QR no servidor, com expiração e idempotência.
- Registro contábil auditável para acumular, ajustar, estornar e resgatar pontos.
- Controle de acesso administrativo e histórico das alterações da taxa.
- Privacidade, retenção, consentimento e suporte ao titular dos dados.
- Disponibilidade móvel e operação em locais com conexão instável.
