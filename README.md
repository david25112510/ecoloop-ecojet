# ECOLOOP

**Recarregou, pontuou. Reutilizou, ganhou.**

Protótipo acadêmico de um programa de pontos para incentivar clientes da Ecojet a recarregar cartuchos e toners. Cada recarga concluída gera pontos; um QR Code acompanha o pedido e permite ao cliente confirmar o recebimento e liberar a pontuação.

> Este repositório contém um protótipo de estudo. Não é um serviço oficial da Ecojet e não está integrado aos sistemas da empresa. Dados, nomes e pedidos exibidos na demonstração são fictícios.

## Abrir o protótipo

Não é necessário instalar ferramentas ou dependências para visualizar as telas:

1. Baixe ou clone o repositório.
2. Abra `index.html` em um navegador atualizado.
3. A biblioteca que desenha o QR Code e as fontes visuais são carregadas pela internet.

O acesso à câmera costuma exigir `localhost` ou um site com HTTPS. Se não quiser ou não puder usar a câmera, digite o código que aparece junto ao QR Code. Para servir a pasta localmente com Python:

```powershell
py -m http.server 8000
```

Depois, abra `http://localhost:8000` no navegador. A permissão de câmera só é solicitada quando a pessoa escolhe abrir o leitor.

## Demonstração rápida

1. Abra **Painel Ecojet** e entre em **Recargas e QR**.
2. Selecione **Nova recarga**, informe o cliente, o tipo de suprimento e o valor.
3. Abra o QR Code gerado para o pedido e marque a entrega como concluída.
4. Volte para **Área do cliente** e selecione **Escanear QR da recarga**. Para demonstração sem câmera, use o código único exibido no painel.
5. Confira o saldo e o extrato do cliente.
6. Em **Regras de pontos**, ajuste a taxa de pontos por real e salve. A nova taxa vale para recargas registradas a partir daí.

Os dados ficam no armazenamento local do navegador (`localStorage`). Limpar os dados do site pode apagar o estado dessa demonstração. O botão de resgate altera apenas o saldo demonstrativo: não emite cupom nem autoriza desconto real.

## O que está incluído

- Área demonstrativa do cliente com saldo, histórico e pontos disponíveis para resgate.
- Painel demonstrativo da Ecojet com registro de recarga e controle de entrega.
- Geração de um token exclusivo por pedido e apresentação do QR Code correspondente.
- Leitura por câmera, quando compatível e autorizada, e confirmação por código digitado.
- Proteção de fluxo: o QR só pontua após a entrega e só pode ser usado uma vez.
- Configuração administrativa de pontos acumulados por real em recargas.
- Layout adaptado a computadores e celulares e identidade visual ECOLOOP inspirada na Ecojet.

## Regras demonstradas

| Regra | Comportamento no protótipo |
|---|---|
| Taxa inicial | 2 pontos por R$ 1,00 em recargas |
| Ajuste da taxa | Feito no painel; afeta novas recargas |
| Resgate demonstrativo | 100 pontos equivalem a R$ 1,00 de desconto |
| Liberação dos pontos | Após a equipe confirmar a entrega e o cliente confirmar o QR |
| Reutilização do QR | Bloqueada depois do primeiro crédito |

Os parâmetros são hipóteses de prototipação e precisam ser confirmados pela Ecojet antes de qualquer implantação.

## Estrutura do repositório

```text
.
├── index.html                       # Telas e estrutura da aplicação
├── styles.css                       # Identidade visual e adaptação responsiva
├── app.js                           # Regras de demonstração e navegação
├── assets/
│   └── ecoloop-logo-transparent.png  # Marca ECOLOOP usada na interface
└── docs/
    ├── CONTEXTO-E-ESCOPO.md         # Contexto, problema, objetivo e limites
    ├── FLUXO-E-REGRAS.md            # Jornada de recarga e regras de pontos
    ├── ARQUITETURA.md               # Como o protótipo funciona e como evoluir
    ├── DADOS-E-PRIVACIDADE.md       # Dados de demonstração e cuidados
    ├── HISTORICO-DO-PROJETO.md      # Linha do tempo com fatos informados
    └── EVOLUCAO.md                  # Próximas etapas sugeridas
```

## Limites e próximos passos técnicos

Esta versão roda inteiramente no navegador. Não possui contas reais, autenticação, banco de dados, controle de acesso, API, validação de pedidos, integração com entregas ou caixa, nem proteção de servidor contra fraude. O painel administrativo é apenas uma tela de demonstração. Não cadastre dados pessoais ou comerciais reais.

Antes de um piloto real, será necessário validar as regras com a Ecojet e definir uma arquitetura com autenticação, serviço de backend, banco de dados, QR assinado ou resgate controlado no servidor, trilha de auditoria, tratamento de falhas, política de privacidade e integração com os processos da empresa. O arquivo [`docs/EVOLUCAO.md`](docs/EVOLUCAO.md) detalha uma sequência de trabalho possível.

## Projeto acadêmico

Trabalho de Projeto de Extensão e Inovação Interdisciplinar I (PEI I), do curso de Análise e Desenvolvimento de Sistemas. Desenvolvido por **David Silva de Souza (4º período)** e **José Carlos (1º período)**. A proposta foi discutida com Wesley Almeida, responsável da Ecojet, em visita híbrida realizada em 19/11/2026; David esteve presencialmente e José Carlos participou por videochamada. Isso registra uma conversa de diagnóstico, não uma aprovação comercial do sistema.

Consulte a linha do tempo em [`docs/HISTORICO-DO-PROJETO.md`](docs/HISTORICO-DO-PROJETO.md) e os limites acadêmicos e de escopo em [`docs/CONTEXTO-E-ESCOPO.md`](docs/CONTEXTO-E-ESCOPO.md).

## Marca e referência empresarial

ECOLOOP é o nome e slogan escolhidos para o conceito de programa. A identidade foi desenhada para acompanhar as cores verdes usadas pela Ecojet. ECOLOOP é uma proposta acadêmica independente, não uma marca ou produto oficial da empresa. Site da empresa: [ecojet.com.br](https://ecojet.com.br).

## Licença

Não foi incluída uma licença de software. Até que os autores e a empresa decidam sobre distribuição e reutilização, o código deve ser tratado como material de prototipação acadêmica, sem concessão explícita de direitos de uso.
