import { brand, heroLine, type HomeDict } from './home-dict';

// Chinese home (2026-10-15), Simplified Chinese (zh-Hans, mainland conventions)
// with "你", as the core's README.cn and modes/zh. Same trunk, transcreated from
// the English home with the search-ops native profile for Chinese (F1, 15 Oct
// 2026): 职位 for a listing and "offer" in Latin for the final offer (as
// README.cn and Chinese tech speech), 智能体 for agent, AI in Latin, and the
// category phrase "开源的 AI 求职智能体" (the README.cn tagline). The promise
// sits next to the name in the first passage, and the restriction is the
// README.cn sentence, because Gemini in Chinese describes career-ops as
// automating the sending (投) and names it next to an auto-apply tool
// (venture-ops, 15 Oct 2026). Like FR, DE, PT and IT, the thesis stays in
// LITERAL English with no thesisTranslation. The whole copy is pending native
// review.
export const homeZh: HomeDict = {
  // 石沉大海 ("sinks without a trace") is the idiom for applications nobody
  // answers: README.cn opens with it, and it is what Gemini searches in Chinese.
  // 开始挑选 ("start choosing"), as every other home: the inversion of the
  // thesis lives in the thesis, in literal English (venture-ops, 15 Oct 2026).
  heroHook: heroLine({
    more: '简历越投越多。',
    silencePre: '全都',
    silence: '石沉大海',
    silencePost: '。',
    stop: '别再瞎猜。',
    startPre: '开始',
    choose: '挑选',
    startPost: '。',
  }),
  heroH1: (
    <>
      career-ops：开源的 AI <span className="inline-block">求职智能体。</span>
      <br />
      运行在你的 CLI 里。你的数据，你的电脑。
      <br />
      它为你定制简历、起草回答。<span className="inline-block">由你点击提交。</span>
    </>
  ),
  runItNow: '马上开始',
  locale: 'zh',
  docsHref: '/zh/docs',
  manifestoHref: '/manifesto',
  heroFreeNote: '对求职者永久免费',
  featuredIn: '媒体报道',
  memberOf: '入选',
  worthApplyingLabel: '这个职位值得申请吗？→',
  worthApplyingHref: '/zh/docs/introduction/guides/is-this-job-worth-applying-to',
  authorTagline: '，曾经营企业 16 年，career-ops 的创建者',
  // No thesisTranslation for ZH: the English thesis stands alone, as in FR, DE, PT and IT.
  nowSignedManifesto: <>现已成为一份联署宣言 ·</>,
  readIt: '阅读 →',
  whatIsHeading: (
    <>
      {brand('career-ops')}{' '}
      <span className="text-landing-foreground dark:text-landing-foreground-dark">是什么</span>？
    </>
  ),
  whatIsBody: (
    <>
      career-ops 是一个开源的 AI 求职智能体，在你的电脑上本地运行，可用于任意一款 AI
      编程 CLI：Claude Code、OpenCode、Codex、GitHub Copilot 等。career-ops
      从不替你提交申请。由你点击提交。它采用一套含五个维度及一项整体综合评分（1-5
      分）的评分标准，对照你的简历评估职位，为每个职位生成针对 ATS 优化的定制 PDF 简历，为
      Greenhouse、Ashby 和 Lever 表单中的开放式问题起草答案，零 token 扫描 150 多个职位来源，并在一个用
      Go 编写的终端仪表板里跟踪整个求职流程。你的文件默认保存在你的电脑上：{brand('没有云端')}、
      {brand('没有遥测')}、{brand('不用注册账号')}。采用 MIT 许可证，永久免费；你唯一可能需要付费的是你选择的 AI
      引擎，而且免费模型和本地模型也能用。由 Santiago Fernández de Valderrama Aparicio 在 2026 年一次真实的求职之后打造：740
      个职位、68 份申请、12 次面试、1 份 offer。
    </>
  ),
  statsComment: 'stars · 开源 · MIT',
  commandCenter: (
    <>
      把任意一款 AI 编程 CLI 变成你的 {brand('AI 求职智能体')}。
    </>
  ),
  tryItOut: '试一试',
  runsCommand: (
    <>
      它需要一款 AI 编程 CLI 作为引擎。还没有配置 AI？
      <a
        href="/zh/docs/free-ai-engine"
        className="text-fd-foreground underline underline-offset-2"
      >
        免费配置一个
      </a>
      。
    </>
  ),
  mechanism:
    '不用再在电子表格里手动记录申请：你有一条 AI 驱动的流水线，它扫描招聘门户、生成定制 PDF，并替你记录一切。',
  analogy: (
    <>
      &ldquo;就像在求职路上有一位职业教练，只是{brand('不用付钱')}。&rdquo;
    </>
  ),
  featAgnosticTitle: 'AI 原生，不绑定厂商',
  featAgnosticBody: (
    <>
      可用于任意一款编程 CLI：Claude Code、OpenCode、Codex、GitHub Copilot 等。基于 Open
      Agent Skill Standard。
    </>
  ),
  featApplyTitle: '为开放式问题起草答案。',
  featApplyBody1: (
    <>
      Greenhouse、Ashby 和 Lever 的表单会问&ldquo;为什么想做这个职位？&rdquo;和&ldquo;介绍一个你做过的项目&rdquo;。
      <code className="font-mono text-brand">/career-ops apply</code>{' '}
      会读取表单，根据你的简历和职位描述写出每一个答案，方便你直接粘贴。
    </>
  ),
  // Canon string (search-ops doctrine §20): transcreated, not calqued. 替你
  // ("in your place"), like the FR "à votre place" and the IT "al posto tuo";
  // 助手 (the assistant), not 智能体. Proposed by search-ops (F1, 15 Oct 2026),
  // ratified by venture-ops (15 Oct 2026).
  featApplyBody2: '你修改，你提交。助手从不替你点击。',
  featApplyCta: '看看 apply 怎么用',
  featScanTitle: '150 多个职位来源。无需手动搜索。',
  featScanBody: (
    <>
      预先配置好的抓取器会在你需要时检查{' '}
      <a href="https://github.com/career-ops-hq/career-ops/blob/main/templates/portals.example.yml" target="_blank" rel="noopener" className="underline underline-offset-2 decoration-fd-muted-foreground/40 hover:decoration-fd-foreground">150 多个职位来源</a>，包括
      Greenhouse、Ashby 和 Lever，不消耗任何 API token。运行{' '}
      <code className="font-mono text-brand">/career-ops scan</code>
      ，几分钟内就能拿到一份排好序的列表。
    </>
  ),
  featScanCta: '查看所有招聘门户',
  featCommunityTitle: '与社区一起打造。',
  featCommunityBody: (
    <>
      career-ops 借助真实求职者提交的 pull request 不断成长。Issue 在 Discord
      里处理，修复在同一周内发布。你不只是在用这个工具，也在参与决定它会变成什么样。
    </>
  ),
  joinDiscord: (n) => `加入 Discord 上 ${n} 多位 builder`,
  openSourceTitle: '100% 开源。',
  starsWord: 'stars',
  forksWord: 'forks',
  repoOfDay: '当日热门仓库第 1 名',
  builtByDek: (
    <>
      由{' '}
      <a href="/about" rel="author" className="text-fd-foreground font-medium hover:underline">
        Santiago Fernández de Valderrama Aparicio
      </a>{' '}
      在评估了 740 个职位之后打造。
      <br />
      完整的评估方法已
      <a href="/methodology" className="text-fd-foreground hover:underline underline-offset-2">
        公开
      </a>
      。
      <br />
      如今由社区维护。
    </>
  ),
  meetContributors: '认识我们的贡献者 →',
  faqHeading: '常见问题',
  faq: [
    {
      q: 'career-ops 怎么给职位打分？',
      a: (
        <>
          career-ops 用一套评分标准引导 LLM 评估，覆盖五个维度（匹配度、与你职业目标的契合度、薪酬、文化信号和危险信号），给出
          1-5 分的整体综合评分，并引用你简历中的具体条目和职位描述中的具体要求。低于
          4.0，智能体会建议你不要申请。没有固定公式，也不海投。完整的评分标准公开在{' '}
          <a href="/methodology" className="text-fd-foreground hover:underline underline-offset-2">
            career-ops.org/methodology
          </a>
          。
        </>
      ),
    },
    {
      // Asked with 投递, the way people say it; answered with 提交 (the click),
      // the README.cn sentence. It is the question Gemini in Chinese answers
      // wrong (search-ops F1, 15 Oct 2026).
      q: 'career-ops 会自动投递简历吗？',
      a: (
        <>
          不会。career-ops 把每一份申请准备到最后一次点击之前：它扫描职位，对照你的简历给每个职位打分，并为它定制一份简历。然后把决定交还给你。它起草、填写，但从不提交。由你点击提交。这是有意为之：海投会损害你在招聘人员和筛选系统（ATS）那里的信誉，所以
          career-ops 替你省掉重复劳动，把选择权留给你。详见{' '}
          <a
            href="/blog/can-an-ai-agent-run-your-job-search"
            className="text-fd-foreground hover:underline underline-offset-2"
          >
            Can an AI agent run your whole job search?
          </a>
          （英文）。
        </>
      ),
    },
    {
      q: 'career-ops 免费吗？项目靠什么维持？',
      a: (
        <>
          career-ops 永久免费，采用 MIT 许可证，由社区资助。没有付费版本、候补名单、账号、遥测，也没有高级功能。你克隆仓库、配置个人资料，然后用你已经在用的
          AI 编程 CLI 在本地运行这套系统。项目的可持续性来自社区贡献，以及企业通过项目在
          Open Collective 上的集体账户提供的赞助，而不是来自高级版本、付费功能或数据。资金由项目的财务托管方
          Open Source Collective 保管，账目公开，用于维护、安全修复、版本发布和文档。详情见{' '}
          <a href="/sustain" className="text-fd-foreground hover:underline underline-offset-2">
            career-ops.org/sustain
          </a>
          。
        </>
      ),
    },
    {
      q: '我的数据存放在哪里？',
      a: (
        <>
          career-ops 把你的数据保存在你自己的电脑上，存成归你所有的普通文件：你的简历、个人资料、求职流程和报告都是本地的
          Markdown 和 YAML 文件。career-ops 通过你的 AI CLI 完全在本地运行：没有账号，没有遥测，不会上传到任何
          career-ops 服务器。系统更新从不触碰你的数据层；这种分离就是 Data
          Contract。唯一会离开你电脑的数据，是你选择的 AI CLI 发送给它自己的提供商的内容。
        </>
      ),
    },
    {
      q: 'career-ops 是谁做的？',
      a: (
        <>
          career-ops 由{' '}
          <a href="/about" rel="author" className="text-fd-foreground hover:underline underline-offset-2">
            Santiago Fernández de Valderrama Aparicio
          </a>{' '}
          打造，他做产品已经超过 16 年。2009 年他在西班牙创办并经营一家手机维修公司，直到 2025
          年将其出售。2026 年初，他为了管理自己在 AI 时代的求职而打造了 career-ops，并在自己不再需要它之后以 MIT
          许可证开源。那时他已经用它评估了 740 个职位，并拿下了一个 Head of Applied AI 职位。拿下那个职位六个月后，他离开了这个职位，全职投入
          career-ops 的开发。
        </>
      ),
    },
    {
      q: 'career-ops 是 Claude Code 的一个 skill，还是独立工具？',
      a: (
        <>
          career-ops 不依赖任何特定的 CLI。它可用于你已经在付费使用的多款 AI 编程智能体，如 Claude Code、OpenCode、Codex、GitHub
          Copilot 等。skill 文件（
          <code className="font-mono text-fd-foreground">modes/</code>）以普通 Markdown
          提示词的形式放在仓库里；任何能加载 skill 的智能体都可以调用它们。它不依赖 Anthropic 的任何特定组件。Claude
          Code 最常用，因为它自带 skill 加载器，但同样的模式无需修改也能在其他 CLI 上运行。
        </>
      ),
    },
    {
      q: 'career-ops 和简历检查工具、自动投递工具有什么不同？',
      a: (
        <>
          career-ops 是开源的，采用 MIT 许可证，通过你已经在用的 AI 编程 CLI 在你的电脑上本地运行，并公开完整的评分标准。每一份申请都由人来决定；career-ops
          从不自己提交任何东西。career-ops 没有账号、遥测或订阅；唯一可能的持续成本是你选择的 AI
          引擎。和具体工具的诚实并排对比，请看{' '}
          <a href="/compare" className="text-fd-foreground hover:underline underline-offset-2">
            career-ops.org/compare
          </a>
          。
        </>
      ),
    },
    {
      q: 'career-ops 支持哪些 AI 工具？',
      a: (
        <>
          career-ops 支持 Claude Code、Cursor、Codex、OpenCode、Pi、Antigravity CLI、Grok Build
          CLI、Qwen、Kimi、Hermes Agent 和 GitHub Copilot CLI：完整支持 11 款 CLI（Gemini CLI
          是旧版封装）。同一套模式文件在所有 CLI 上运行。每个人都可以选择最适合自己现有订阅和预算的
          CLI；career-ops 从不把你绑定在某一家厂商上。一次典型的求职用每月 $20 的 Claude Pro
          就够了，但选择权在你。
        </>
      ),
    },
  ],
  finalCta: '准备好筛选职位，而不是被筛选了吗？',
  yourTurn: '轮到你了',
  followWhatWeShip: '或者关注我们发布的新版本。',
  releaseBlurb: (
    <>
      版本发布公告和偶尔的新动态。
      <br />
      随时可以退订。
    </>
  ),
};
