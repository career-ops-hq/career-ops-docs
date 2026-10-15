import { brand, heroLine, type HomeDict } from './home-dict';

// Portuguese home (2026-10-13), Brazilian Portuguese (pt-BR) with "você". Brazil
// is ~87% of the Portuguese-language clicks and the core ships modes/pt. Same
// trunk, transcreated from the English home with the search-ops native profile
// for Portuguese (F1, 9 Oct 2026): "vaga" for a listing and "proposta" for the
// final offer (in Brazil "oferta de emprego" is the listing), the category
// phrase "agente de IA de código aberto para busca de emprego", and the
// README's canonical restriction line in the first passage (venture-ops,
// 13 Oct 2026: one version site-wide, the README's), because in Portuguese Gemini
// pairs "open-source AI agent" with "auto-apply-bot github". Like FR and DE,
// the thesis stays in LITERAL English with no thesisTranslation. The hero was
// ratified by venture-ops (13 Oct 2026); the whole copy is pending native review.
export const homePt: HomeDict = {
  // "vácuo" is the Brazilian idiom for a message nobody answers.
  heroHook: heroLine({
    more: 'Mais candidaturas.',
    silencePre: 'Mais ',
    silence: 'vácuo',
    silencePost: '.',
    stop: 'Pare de adivinhar.',
    startPre: 'Comece a ',
    choose: 'escolher',
    startPost: '.',
  }),
  heroH1: (
    <>
      career-ops: agente de IA de código aberto para busca de{'\u00a0'}emprego.
      <br />
      Roda na sua CLI. Seus dados, seu computador.
      <br />
      Adapta seu currículo e redige suas respostas.{' '}
      <span className="inline-block">Você clica em Enviar.</span>
    </>
  ),
  runItNow: 'Começar agora',
  locale: 'pt',
  docsHref: '/pt/docs',
  manifestoHref: '/manifesto',
  heroFreeNote: 'Gratuito para candidatos, para sempre',
  featuredIn: 'Destaque em',
  memberOf: 'Membro do',
  worthApplyingLabel: 'Como saber se vale a pena se candidatar a uma vaga →',
  worthApplyingHref: '/pt/docs/introduction/guides/is-this-job-worth-applying-to',
  authorTagline: ', 16 anos à frente de um negócio e criador do career-ops',
  // No thesisTranslation for PT: the English thesis stands alone, as in FR and DE.
  nowSignedManifesto: <>Agora um manifesto assinado ·</>,
  readIt: 'Ler →',
  whatIsHeading: (
    <>
      <span className="text-landing-foreground dark:text-landing-foreground-dark">
        O que é o
      </span>{' '}
      {brand('career-ops')}?
    </>
  ),
  whatIsBody: (
    <>
      O career-ops é um agente de IA de código aberto para busca de emprego que
      roda localmente no seu computador, dentro de qualquer CLI de programação
      com IA: Claude Code, OpenCode, Codex, GitHub Copilot e outras. Ele redige e
      preenche; nunca envia. Você clica em Enviar. Avalia as vagas em relação ao seu currículo com uma
      rubrica de cinco dimensões mais uma nota global holística de 1 a 5, gera
      currículos em PDF otimizados para ATS e adaptados a cada vaga, redige
      respostas para as perguntas abertas dos formulários do Greenhouse, do
      Ashby e do Lever, varre mais de 150 fontes de vagas sem gastar tokens e
      acompanha o funil em um painel no terminal escrito em Go. Tudo fica no seu
      computador: {brand('sem nuvem')}, {brand('sem telemetria')},{' '}
      {brand('sem conta')}. Licença MIT e gratuito para sempre; a única coisa que você talvez pague é o
      motor de IA que escolher, e modelos gratuitos e locais também funcionam. Criado por Santiago Fernández
      de Valderrama Aparicio depois de uma busca de emprego real em 2026: 740
      vagas, 68 candidaturas, 12 entrevistas e uma proposta.
    </>
  ),
  statsComment: 'estrelas · Código aberto · MIT',
  commandCenter: (
    <>
      Transforme qualquer CLI de programação com IA no seu{' '}
      {brand('agente de IA para busca de emprego')}.
    </>
  ),
  tryItOut: 'Experimente',
  runsCommand: (
    <>
      Precisa de uma CLI de programação com IA como motor. Ainda não configurou
      nenhuma IA?{' '}
      <a
        href="/pt/docs/free-ai-engine"
        className="text-fd-foreground underline underline-offset-2"
      >
        Configure uma de graça
      </a>
      .
    </>
  ),
  mechanism:
    'Em vez de acompanhar as candidaturas à mão numa planilha, você tem um funil com IA que varre os portais, gera PDFs adaptados e registra tudo para você.',
  analogy: (
    <>
      &ldquo;É como ter um coach de carreira na sua busca de emprego, mas{' '}
      {brand('sem pagar por isso')}.&rdquo;
    </>
  ),
  featAgnosticTitle: 'Feito para IA, sem dependência de fornecedor',
  featAgnosticBody: (
    <>
      Funciona com qualquer CLI de programação: Claude Code, OpenCode, Codex,
      GitHub Copilot e outras. Baseado no Open Agent Skill Standard.
    </>
  ),
  featApplyTitle: 'Redige as respostas abertas.',
  featApplyBody1: (
    <>
      Os formulários do Greenhouse, do Ashby e do Lever perguntam &ldquo;Por que
      esta vaga?&rdquo; e &ldquo;Conte sobre um projeto.&rdquo;{' '}
      <code className="font-mono text-brand">/career-ops apply</code> lê o
      formulário, redige cada resposta a partir do seu currículo e da descrição
      da vaga e devolve tudo pronto para colar.
    </>
  ),
  // Canon string (search-ops doctrine §20): transcreated, not calqued: like
  // the FR "à votre place" and the DE "an deiner Stelle", "no seu lugar"
  // instead of "por você". Agreed with search-ops (F1-bis, 13 Oct 2026); the
  // hero copy is ratified by venture-ops.
  featApplyBody2: 'Você edita, você envia. O assistente nunca clica no seu lugar.',
  featApplyCta: 'Veja como o apply funciona',
  featScanTitle: 'Mais de 150 fontes de vagas. Zero busca manual.',
  featScanBody: (
    <>
      Scrapers pré-configurados verificam, quando você quiser,{' '}
      <a href="https://github.com/career-ops-hq/career-ops/blob/main/templates/portals.example.yml" target="_blank" rel="noopener" className="underline underline-offset-2 decoration-fd-muted-foreground/40 hover:decoration-fd-foreground">mais de 150 fontes de vagas</a>, entre elas
      Greenhouse, Ashby e Lever, sem gastar nenhum token de API. Rode{' '}
      <code className="font-mono text-brand">/career-ops scan</code> e receba uma
      lista ordenada em poucos minutos.
    </>
  ),
  featScanCta: 'Ver todos os portais',
  featCommunityTitle: 'Construído com a comunidade.',
  featCommunityBody: (
    <>
      O career-ops cresce com pull requests de pessoas que estão procurando
      emprego de verdade. Os issues são triados no Discord e as correções saem na
      mesma semana. Você não só usa a ferramenta: ajuda a decidir o que ela vai
      ser.
    </>
  ),
  joinDiscord: (n) => `Junte-se a mais de ${n} builders no Discord`,
  openSourceTitle: '100% código aberto.',
  starsWord: 'estrelas',
  forksWord: 'forks',
  repoOfDay: 'Repo do dia nº 1',
  builtByDek: (
    <>
      Criado por{' '}
      <a href="/about" rel="author" className="text-fd-foreground font-medium hover:underline">
        Santiago Fernández de Valderrama Aparicio
      </a>{' '}
      depois de avaliar 740 vagas.
      <br />
      A metodologia completa de avaliação está{' '}
      <a href="/methodology" className="text-fd-foreground hover:underline underline-offset-2">
        publicada
      </a>
      .
      <br />
      Hoje mantido pela comunidade.
    </>
  ),
  meetContributors: 'Conheça quem contribui →',
  faqHeading: 'Perguntas frequentes',
  faq: [
    {
      q: 'Como o career-ops avalia uma vaga?',
      a: (
        <>
          O career-ops usa uma avaliação por LLM guiada por uma rubrica de cinco
          dimensões (aderência, alinhamento com o seu objetivo de carreira,
          remuneração, sinais culturais e sinais de alerta) que gera uma nota
          global holística de 1 a 5, com referências a linhas específicas do seu
          currículo e a requisitos da vaga. Abaixo de 4,0, o agente recomenda não
          se candidatar. Sem fórmula fechada, sem candidatura em massa. A rubrica
          completa está publicada em{' '}
          <a href="/methodology" className="text-fd-foreground hover:underline underline-offset-2">
            career-ops.org/methodology
          </a>
          .
        </>
      ),
    },
    {
      q: 'O career-ops se candidata às vagas por mim?',
      a: (
        <>
          Não. O career-ops prepara cada candidatura até o último clique: varre as
          vagas, avalia cada uma em relação ao seu currículo e gera uma
          versão adaptada dele. Depois devolve a decisão para você. Ele redige e preenche;
          nunca envia. Você clica em Enviar. Isso é proposital: candidatura em
          massa queima a sua reputação com recrutadores e sistemas de triagem
          (ATS), então o career-ops tira o trabalho repetitivo e deixa a escolha
          com você. Mais em{' '}
          <a
            href="/blog/can-an-ai-agent-run-your-job-search"
            className="text-fd-foreground hover:underline underline-offset-2"
          >
            Can an AI agent run your whole job search?
          </a>{' '}
          (em inglês).
        </>
      ),
    },
    {
      q: 'O career-ops é gratuito? Como o projeto se sustenta?',
      a: (
        <>
          O career-ops é gratuito para sempre, tem licença MIT e é financiado pela
          comunidade. Não há plano pago, lista de espera, conta, telemetria nem
          recursos premium. Você clona o repositório, configura o seu perfil e
          roda o sistema localmente com a CLI de programação com IA que já usa. A
          sustentabilidade vem de contribuições da comunidade e de patrocínio de
          empresas pelo coletivo do projeto no Open Collective, e não de planos
          premium, recursos pagos ou dados. Os fundos ficam com o anfitrião fiscal do
          projeto, o Open Source Collective, num livro-caixa público, e vão para
          manutenção, correções de segurança, releases e documentação. Detalhes
          em{' '}
          <a href="/sustain" className="text-fd-foreground hover:underline underline-offset-2">
            career-ops.org/sustain
          </a>
          .
        </>
      ),
    },
    {
      q: 'Onde ficam os meus dados?',
      a: (
        <>
          O career-ops guarda os seus dados no seu próprio computador, em arquivos
          simples que são seus: currículo, perfil, funil e relatórios são
          arquivos locais em Markdown e YAML. O career-ops roda inteiramente no
          seu computador, pela sua CLI de IA: sem conta, sem telemetria, nada é
          enviado a um servidor do career-ops. As atualizações do sistema nunca
          tocam na sua camada de dados; essa separação é o Data Contract. Os
          únicos dados que saem do seu computador são os que a CLI de IA que você
          escolheu envia ao próprio provedor.
        </>
      ),
    },
    {
      q: 'Quem criou o career-ops?',
      a: (
        <>
          O career-ops foi criado por{' '}
          <a href="/about" rel="author" className="text-fd-foreground hover:underline underline-offset-2">
            Santiago Fernández de Valderrama Aparicio
          </a>
          , que passou mais de 16 anos construindo produtos. Ele fundou e dirigiu
          uma empresa espanhola de conserto de celulares de 2009 até vendê-la em
          2025. No começo de 2026, criou o career-ops para organizar a própria
          busca de emprego na era da IA e abriu o código sob licença MIT quando
          não precisava mais dele. Até então, tinha avaliado 740 vagas com ele e
          conseguido um cargo de Head of Applied AI. Seis meses depois de
          assumir, deixou esse cargo para se dedicar ao career-ops em tempo
          integral.
        </>
      ),
    },
    {
      q: 'O career-ops é uma skill do Claude Code ou uma ferramenta independente?',
      a: (
        <>
          O career-ops não depende de uma CLI específica. Funciona com Claude
          Code, OpenCode, Codex, GitHub Copilot e outras: o agente de programação
          com IA que você já paga. Os arquivos de skill (
          <code className="font-mono text-fd-foreground">modes/</code>) ficam no
          repositório como prompts simples em Markdown; qualquer agente que
          carregue skills pode chamá-los. Não há dependência específica da
          Anthropic. O Claude Code é o ambiente mais comum por causa do seu
          carregador de skills, mas os mesmos modos rodam sem alterações nas outras
          CLIs.
        </>
      ),
    },
    {
      q: 'Qual a diferença entre o career-ops e os verificadores de currículo e as ferramentas de candidatura automática?',
      a: (
        <>
          O career-ops é de código aberto, tem licença MIT, roda localmente no
          seu computador pela CLI de programação com IA que você já usa e publica
          a rubrica de avaliação completa. Uma pessoa decide cada candidatura;
          ele nunca envia nada sozinho. Não há conta, telemetria nem assinatura do
          próprio career-ops; o único custo recorrente é a CLI de IA que você
          escolher. Para comparações honestas, lado a lado, com ferramentas
          específicas, veja{' '}
          <a href="/compare" className="text-fd-foreground hover:underline underline-offset-2">
            career-ops.org/compare
          </a>
          .
        </>
      ),
    },
    {
      q: 'Com quais ferramentas de IA o career-ops funciona?',
      a: (
        <>
          O career-ops funciona com Claude Code, Cursor, Codex, OpenCode, Pi,
          Antigravity CLI, Grok Build CLI, Qwen, Kimi, Hermes Agent e GitHub
          Copilot CLI: onze CLIs com suporte completo (a Gemini CLI é um wrapper
          legado). Os mesmos arquivos de modo rodam em todas. Cada pessoa escolhe
          a CLI que combina com a assinatura que já tem e com o quanto quer
          gastar; o career-ops nunca prende você a um único fornecedor. Uma busca
          de emprego típica roda com o Claude Pro a US$ 20 por mês, mas a escolha
          é sua.
        </>
      ),
    },
  ],
  finalCta: 'Pronto para filtrar as vagas, em vez de ser filtrado?',
  yourTurn: 'Sua vez',
  followWhatWeShip: 'Ou acompanhe nossos lançamentos.',
  releaseBlurb: (
    <>
      Anúncios de releases e novidades de vez em quando.
      <br />
      Cancele quando quiser.
    </>
  ),
};
