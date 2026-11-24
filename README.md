# RETINTA ECOJET

**Recarregou, pontuou. Reutilizou, ganhou.**

Protótipo acadêmico de um programa de pontos para incentivar clientes da Ecojet a recarregar cartuchos e toners. Cada recarga concluída gera pontos; um QR Code acompanha o pedido e permite ao cliente confirmar o recebimento e liberar a pontuação.

> Este repositório contém um protótipo de estudo. Não é um serviço oficial da Ecojet e não está integrado aos sistemas da empresa. Dados, nomes e pedidos exibidos na demonstração são fictícios.

## Abrir o protótipo

Não é necessário instalar ferramentas ou dependências para visualizar as telas:

1. Baixe ou clone o repositório.
2. No Windows, clique duas vezes em [`ABRIR-ECOLOOP.bat`](ABRIR-ECOLOOP.bat). Ele inicia um servidor local e abre o protótipo no navegador. Deixe aberta a janela **Servidor RETINTA ECOJET** enquanto usa o sistema; feche-a para encerrar o servidor.
3. Como alternativa, abra um terminal nesta pasta, execute `py -m http.server 8000` e acesse `http://localhost:8000`.
4. A biblioteca que desenha o QR Code e as fontes visuais são carregadas pela internet.

O link **Regulamento demonstrativo**, no rodapé do protótipo, abre a página [`regulamento.html`](regulamento.html). Ela apresenta as regras demonstradas no protótipo aprovado para teste e separa definições operacionais necessárias antes de eventual operação real.

O acesso à câmera costuma exigir `localhost` ou um site com HTTPS. Se não quiser ou não puder usar a câmera, digite o código que aparece junto ao QR Code. Para servir a pasta localmente com Python:

Na visão geral do cliente, a foto do cartucho Ecojet recebe uma sobreposição de etiqueta com o arquivo oficial do estudo de logo RETINTA ECOJET e um QR Code ilustrativo. Esse QR não identifica um pedido real; os QR Codes funcionais continuam sendo gerados ao registrar uma recarga no painel Ecojet.

```powershell
py -m http.server 8000
```

Depois, abra `http://localhost:8000` no navegador. A permissão de câmera só é solicitada quando a pessoa escolhe abrir o leitor.

## Demonstração rápida

1. Abra **Painel Ecojet** e entre em **Clientes**. Cadastre um cliente fictício ou pesquise um cadastro para conferir saldo e histórico.
2. Em **Regras de pontos e operadores**, cadastre quem vai operar e selecione a pessoa ativa; depois confira a taxa de pontos.
3. Entre em **Recargas e QR**, selecione o cliente cadastrado, o tipo de suprimento e o valor. O registro guarda o operador ativo.
4. No detalhe do pedido, confira ou ajuste largura e altura para corresponder à etiqueta carregada na Zebra GC420 e selecione **Imprimir etiqueta na Zebra GC420**.
5. Na janela de impressão do navegador, escolha a impressora Zebra local e confirme as preferências de mídia; a aplicação abre a prévia/impressão, mas não dispara impressão silenciosa.
6. Marque a entrega como concluída. O operador ativo fica registrado nesta etapa. O cliente seleciona seu perfil demonstrativo e escaneia o QR; para a demonstração sem câmera, use o código único.
7. Confira a ficha do cliente, saldo e extrato. Para repetir a sessão, restaure os dados demonstrativos nas regras.

Para repetir uma rodada desde o início, abra **Regras de pontos** e escolha **Restaurar dados de demonstração**. A ação apaga as alterações salvas neste navegador e repõe os dados fictícios iniciais. O roteiro completo está em [`docs/ROTEIRO-DE-TESTES.md`](docs/ROTEIRO-DE-TESTES.md).

Os dados ficam no armazenamento local do navegador (`localStorage`). Limpar os dados do site pode apagar o estado dessa demonstração. O botão de resgate altera apenas o saldo demonstrativo: não emite cupom nem autoriza desconto real.

## O que está incluído

- Área demonstrativa do cliente com saldo, histórico e pontos disponíveis para resgate.
- Cadastro e busca de clientes por nome ou código, com saldo e histórico individual de recargas, pontos e resgates.
- Cadastro de operadores e autoria registrada no cadastro da recarga e na confirmação da entrega.
- Recargas vinculadas a um cliente cadastrado para evitar nomes duplicados por erro de digitação.
- Painel demonstrativo da Ecojet com registro de recarga e controle de entrega.
- Geração de um token exclusivo por pedido e apresentação do QR Code correspondente.
- Preparação de etiqueta com QR e envio à janela de impressão local do navegador, permitindo escolher a Zebra GC420 instalada.
- Leitura por câmera, quando compatível e autorizada, e confirmação por código digitado.
- Proteção de fluxo: o QR só pontua após a entrega e só pode ser usado uma vez.
- Configuração administrativa de pontos acumulados por real em recargas.
- Layout adaptado a computadores e celulares e identidade visual RETINTA ECOJET inspirada na Ecojet.

## Regras demonstradas

| Regra | Comportamento no protótipo |
|---|---|
| Taxa inicial | 2 pontos por R$ 1,00 em recargas |
| Ajuste da taxa | Feito no painel; afeta novas recargas |
| Resgate demonstrativo | 100 pontos equivalem a R$ 1,00 de desconto |
| Liberação dos pontos | Após a equipe confirmar a entrega e o cliente confirmar o QR |
| Reutilização do QR | Bloqueada depois do primeiro crédito |

Os valores iniciais representam as regras demonstradas no protótipo aprovado para teste. A operação comercial ainda depende de planejamento técnico e definição dos procedimentos da Ecojet.

## Estrutura do repositório

```text
.
├── index.html                       # Telas e estrutura da aplicação
├── styles.css                       # Identidade visual e adaptação responsiva
├── app.js                           # Regras de demonstração e navegação
├── regulamento.html                 # Página de regras demonstrativas do programa
├── regulamento.css                  # Estilo responsivo da página de regulamento
├── assets/
│   └── retinta-ecojet-logo.png       # Estudo de marca RETINTA ECOJET usado na interface
│   └── cartucho-ecojet-demo.png      # Foto do cartucho com etiqueta ilustrativa sobreposta na interface
└── docs/
    ├── CONTEXTO-E-ESCOPO.md         # Contexto, problema, objetivo e limites
    ├── FLUXO-E-REGRAS.md            # Jornada de recarga e regras de pontos
    ├── ARQUITETURA.md               # Como clientes, operadores e histórico são armazenados
    ├── DADOS-E-PRIVACIDADE.md       # Dados de demonstração e cuidados
    ├── ROTEIRO-DE-TESTES.md         # Casos e registro das sessões de teste
    ├── RESULTADOS-TESTE-2026-11-24.md # Resultados observados nas primeiras sessões
    ├── HISTORICO-DO-PROJETO.md      # Linha do tempo com fatos informados
    └── EVOLUCAO.md                  # Próximas etapas sugeridas
```

## Limites e próximos passos técnicos

Esta versão roda inteiramente no navegador. A etiqueta é montada localmente e encaminhada à caixa de impressão do navegador para selecionar a Zebra GC420; não há envio direto à impressora por rede ou servidor de impressão. As dimensões da etiqueta devem corresponder ao rolo instalado e às preferências do driver. O protótipo não possui contas reais, autenticação, banco de dados, controle de acesso, API, validação de pedidos, integração com entregas ou caixa, nem proteção de servidor contra fraude. O painel administrativo é apenas uma tela de demonstração. Não cadastre dados pessoais ou comerciais reais.

Antes de um piloto real, será necessário validar as regras com a Ecojet e definir uma arquitetura com autenticação, serviço de backend, banco de dados, QR assinado ou resgate controlado no servidor, trilha de auditoria, tratamento de falhas, política de privacidade e integração com os processos da empresa. O arquivo [`docs/EVOLUCAO.md`](docs/EVOLUCAO.md) detalha uma sequência de trabalho possível.

## Projeto acadêmico

Trabalho de Projeto de Extensão e Inovação Interdisciplinar I (PEI I), do curso de Análise e Desenvolvimento de Sistemas. Desenvolvido por **David Silva de Souza (4º período)** e **José Carlos (4º período)**.

## Histórico do projeto

| Data | Atividade |
|---|---|
| Julho de 2026 (dia não registrado) | Início do trabalho em dupla e busca pela Ecojet como empresa parceira. |
| 20/08/2026 | Visita de diagnóstico à Ecojet. David participou presencialmente e José Carlos por videochamada; Wesley Almeida relatou a necessidade de incentivar recargas com pontos ecológicos. |
| 19–23/11/2026 | Estruturação da proposta inicialmente chamada ECOLOOP, definição do fluxo do programa e desenvolvimento do protótipo e da documentação. |
| 24/11/2026 | Prazo de entrega acadêmica informado pela dupla. |
| 24/11/2026 | A Ecojet validou a proposta, aprovou o protótipo para teste e confirmou o nome RETINTA ECOJET após consulta. A dupla atualizou a identidade visual, o histórico e o regulamento demonstrativo. |

A validação e aprovação do protótipo para teste foram informadas pela dupla em 24/11/2026. Isso registra a autorização para testar o protótipo, sem afirmar que o programa esteja implantado comercialmente. Consulte o escopo em [`docs/CONTEXTO-E-ESCOPO.md`](docs/CONTEXTO-E-ESCOPO.md) e o histórico em [`docs/HISTORICO-DO-PROJETO.md`](docs/HISTORICO-DO-PROJETO.md).

## Marca e referência empresarial

O programa foi inicialmente chamado ECOLOOP. Em 24/11/2026, a Ecojet validou a proposta, aprovou o protótipo para teste e confirmou o nome RETINTA ECOJET após consulta. A identidade visual acompanha as cores verdes usadas pela Ecojet. A aprovação refere-se à proposta e ao protótipo em teste; não significa implantação comercial. Site da empresa: [ecojet.com.br](https://ecojet.com.br).

## Licença

Não foi incluída uma licença de software. Até que os autores e a empresa decidam sobre distribuição e reutilização, o código deve ser tratado como material de prototipação acadêmica, sem concessão explícita de direitos de uso.
