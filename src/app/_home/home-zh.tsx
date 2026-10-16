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
  // Native review: describe unanswered applications, then screening before applying.
  heroHook: heroLine({
    more: '简历陆续投出，',
    silencePre: '迟迟没有',
    silence: '回复',
    silencePost: '？',
    stop: '先筛职位，',
    startPre: '再投',
    choose: '简历',
    startPost: '。',
    highlightStop: true,
  }),
  heroH1: (
    <>
      career-ops：开源的 AI <span className="inline-block">求职智能体。</span>
      <br />
      通过 CLI 在本地运行，求职资料保存在本机。
      <br />
      帮你定制简历、起草回答，<span className="inline-block">最后由你亲自提交。</span>
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
      <span className="block mb-5">
        career-ops 是一个开源的 AI 求职智能体，帮你筛选职位、准备申请、跟踪求职进度。它在本机运行，支持 Claude Code、OpenCode、Codex、GitHub Copilot 等 AI 编程 CLI。申请准备好后，必须由你亲自点击提交。
      </span>
      <span className="block mb-5">
        它结合你的简历和职位要求，从五个维度评估职位，给出 1–5 分的综合评分，还可针对职位生成经过 ATS 优化的定制 PDF 简历，为 Greenhouse、Ashby 和 Lever 表单中的开放式问题起草回答。此外，它能扫描 150 多个职位来源，无需消耗 API token，并在 Go 编写的终端仪表板中跟踪求职进度。
      </span>
      <span className="block mb-5">
        求职资料默认{brand('保存在本机')}，不上传至 career-ops 服务器，{brand('无需注册账号')}，也{brand('没有遥测')}。使用云端 AI 时，相关内容仍会通过你选择的 AI CLI 发送给模型提供商。项目采用 MIT 许可证，永久免费，仅 AI 引擎可能产生费用，也支持免费模型和本地模型。
      </span>
      <span className="block">
        创建者 Santiago Fernández de Valderrama Aparicio 在 2026 年的真实求职中用它评估了 740 个职位、投递了 68 份申请、参加了 12 次面试，最终获得 1 份 offer。
      </span>
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
    '无需再手动维护求职表格：让 AI 帮你扫描职位、生成定制 PDF 简历、跟踪申请进度。',
  analogy: (
    <>
      &ldquo;如同有职业教练在身边，为你提供{brand('免费的求职指导')}。&rdquo;
    </>
  ),
  featAgnosticTitle: '沿用你熟悉的 AI 工具',
  featAgnosticBody: (
    <>
      可搭配 Claude Code、OpenCode、Codex、GitHub Copilot 等多种 AI 编程 CLI 使用，按你的习惯自由选择。基于 Open Agent Skill Standard。
    </>
  ),
  featApplyTitle: '为开放式问题拟好答案',
  featApplyBody1: (
    <>
      Greenhouse、Ashby 和 Lever 的申请表里，常有&ldquo;为什么想申请这个职位？&rdquo;&ldquo;介绍一个你做过的项目&rdquo;等问题。
      <code className="font-mono text-brand">/career-ops apply</code>{' '}
      会读取表单中的问题，结合你的简历和职位描述，逐一拟好回答，方便你直接粘贴。
    </>
  ),
  // Native review: the user reviews answers and personally submits the application.
  featApplyBody2: '回答由你审核，申请由你亲自提交。',
  featApplyCta: '看看 apply 怎么用',
  featScanTitle: <>150 多个职位来源，<span className="inline-block">一次扫描</span></>,
  featScanBody: (
    <>
      内置抓取工具可按需扫描{' '}
      <a href="https://github.com/career-ops-hq/career-ops/blob/main/templates/portals.example.yml" target="_blank" rel="noopener" className="underline underline-offset-2 decoration-fd-muted-foreground/40 hover:decoration-fd-foreground">150 多个职位来源</a>，涵盖
      Greenhouse、Ashby 和 Lever 等招聘平台，无需消耗 API token。运行{' '}
      <code className="font-mono text-brand">/career-ops scan</code>
      ，几分钟内即可获得一份排好序的职位列表。
    </>
  ),
  featScanCta: '查看所有招聘门户',
  featCommunityTitle: '和社区一起完善 career-ops',
  featCommunityBody: (
    <>
      求职者通过提交 pull request，持续改进 career-ops。社区在 Discord 上讨论和处理 Issue，并在当周发布修复。你既是使用者，也可以参与决定它今后的发展方向。
    </>
  ),
  featCommunityMembers: (n) => `与 ${n} 多位社区成员交流。`,
  joinDiscord: () => '加入 Discord 社区',
  openSourceTitle: '100% 开源。',
  starsWord: 'stars',
  forksWord: 'forks',
  repoOfDay: '当日热门仓库第 1 名',
  builtByDek: (
    <>
      <a href="/about" rel="author" className="text-fd-foreground font-medium hover:underline">
        Santiago Fernández de Valderrama Aparicio
      </a>{' '}
      在评估了 740 个职位后，打造了 career-ops，并公开了
      <a href="/methodology" className="text-fd-foreground hover:underline underline-offset-2">
        完整的评估方法
      </a>
      。
      <br />
      如今，项目由社区共同维护。
    </>
  ),
  meetContributors: '看看谁在参与贡献 →',
  faqHeading: '常见问题',
  faq: [
    {
      q: 'career-ops 如何评估职位？',
      a: (
        <>
          <span className="block mb-4">
            career-ops 通过一套评分标准，引导大语言模型（LLM）从匹配度、与职业目标的契合度、薪酬、企业文化信号和风险信号五个维度评估职位。评估会引用你简历中的具体经历和职位描述中的具体要求，并给出 1–5 分的综合评分。
          </span>
          评分低于 4.0 时，智能体会建议你跳过该职位。评分不采用固定公式；是否申请由你决定，career-ops 不会自动海投。完整的评分标准已
          <a href="/methodology" className="text-fd-foreground hover:underline underline-offset-2">
            公开
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
          <span className="block mb-4">
            不会。career-ops 只会帮你完成提交前的准备：扫描职位、结合你的简历评估匹配度，并为每个职位定制简历。它负责起草和填写，申请必须由你亲自点击提交。
          </span>
          这样的设计是为了避免海投损害你在招聘人员和申请人跟踪系统（ATS）中的信誉。career-ops 帮你处理重复工作，把是否申请的决定留给你。详见{' '}
          <a
            href="/blog/can-an-ai-agent-run-your-job-search"
            className="text-fd-foreground hover:underline underline-offset-2"
          >
            AI 智能体能包办整个求职流程吗？
          </a>
          （英文）。
        </>
      ),
    },
    {
      q: 'career-ops 免费吗？项目如何持续维护？',
      a: (
        <>
          <span className="block mb-4">
            career-ops 采用 MIT 许可证，永久免费，由社区资助。无需注册账号或加入候补名单，没有遥测，也没有付费版本或需要付费解锁的高级功能。克隆仓库、配置个人资料后，就可以通过你现有的 AI 编程 CLI 在本机运行。
          </span>
          项目依靠社区贡献，以及企业通过项目在 Open Collective 上的账户提供的赞助持续维护，而非销售付费功能或用户数据。资金由财务托管方 Open Source Collective 保管，收支公开，用于日常维护、安全修复、版本发布和文档工作。详情见
          <a href="/sustain" className="text-fd-foreground hover:underline underline-offset-2">
            项目资金说明
          </a>
          。
        </>
      ),
    },
    {
      q: '我的数据存放在哪里？',
      a: (
        <>
          <span className="block mb-4">
            求职资料保存在自己的电脑上，归你所有。个人资料、求职记录等以普通的 Markdown 和 YAML 文件保存，定制简历则可生成为 PDF。career-ops 通过你选择的 AI CLI 在本机运行，无需注册账号，也没有遥测。系统更新不会修改你的数据；这种程序与数据分离的约定称为 Data Contract。
          </span>
          只有你选择的 AI CLI 发送给其模型提供商的内容会离开本机；求职资料不会上传至 career-ops 服务器。
        </>
      ),
    },
    {
      q: 'career-ops 是谁做的？',
      a: (
        <>
          <span className="block mb-4">
            career-ops 的创建者是{' '}
            <a href="/about" rel="author" className="text-fd-foreground hover:underline underline-offset-2">
              Santiago Fernández de Valderrama Aparicio
            </a>
            ，他拥有超过 16 年的产品经验。2009 年，他在西班牙创办了一家手机维修公司，并持续经营至 2025 年出售。
          </span>
          2026 年初，他开发了 career-ops，用来管理自己在 AI 时代的求职流程。他用它评估了 740 个职位，成功获得 Head of Applied AI 职位，之后在自己不再需要这款工具时，以 MIT 许可证将其开源。入职六个月后，他离职并全职投入 career-ops 的开发。
        </>
      ),
    },
    {
      q: 'career-ops 是 Claude Code 的 skill，还是独立工具？',
      a: (
        <>
          <span className="block mb-4">
            career-ops 不绑定某一款 CLI，可以搭配你正在使用的 Claude Code、OpenCode、Codex、GitHub Copilot 等 AI 编程智能体运行。
          </span>
          仓库中的 <code className="font-mono text-fd-foreground">modes/</code> 目录以普通 Markdown 提示词保存各个模式的 skill 文件，支持加载 skill 的智能体都可以调用，无需依赖 Anthropic 的专有组件。Claude Code 因自带 skill 加载器而最常用，但同一套模式文件也能直接用于其他 CLI，无需修改。
        </>
      ),
    },
    {
      q: 'career-ops 和简历检查工具、自动投递工具有什么不同？',
      a: (
        <>
          <span className="block mb-4">
            career-ops 采用 MIT 许可证开源，通过你正在使用的 AI 编程 CLI 在本机运行，完整的职位评分标准也已公开。每份申请都由你决定是否投递，并亲自提交，career-ops 不会自动提交。
          </span>
          使用 career-ops 无需注册账号，没有遥测或订阅费用；唯一可能持续产生的费用来自你选择的 AI 引擎。各款工具的功能与费用有何差异，可以查看
          <a href="/compare" className="text-fd-foreground hover:underline underline-offset-2">
            如实整理的工具对比
          </a>
          。
        </>
      ),
    },
    {
      q: 'career-ops 支持哪些 AI 工具？',
      a: (
        <>
          <span className="block mb-4">
            career-ops 完整支持 11 款 AI 编程 CLI：Claude Code、Cursor、Codex、OpenCode、Pi、Antigravity CLI、Grok Build CLI、Qwen、Kimi、Hermes Agent 和 GitHub Copilot CLI。Gemini CLI 则通过旧版封装支持。同一套模式文件可在这些 CLI 上运行，无需绑定某一家厂商。
          </span>
          你可以根据现有订阅和预算自由选择。通常，每月 $20 的 Claude Pro 就足以满足一次求职的需要，也可以使用其他适合你的 AI 引擎。
        </>
      ),
    },
  ],
  finalCta: <>让 AI 帮你筛选，<span className="inline-block max-w-full">从合适的职位开始。</span></>,
  yourTurn: '立即试试',
  followWhatWeShip: '或者关注我们发布的新版本。',
  releaseBlurb: (
    <>
      版本发布公告和偶尔的新动态。
      <br />
      随时可以退订。
    </>
  ),
};
