import { brand, heroLine, type HomeDict } from './home-dict';

// Turkish home (2026-10-30), addressing the reader as "sen", as the core's
// README.tr does. Same trunk, transcreated from the English home with the
// search-ops native profile for Turkish (F1, 30 Oct 2026): "ilan" for a listing
// and "teklif" for the final offer, "CV" over "özgeçmiş", "yapay zeka" without the
// circumflex, and the category phrase "açık kaynaklı yapay zeka iş arama ajanı".
// The restriction line comes from README.tr. Like FR, DE, PT, IT and ZH, the
// thesis stays in LITERAL English with no thesisTranslation. The whole copy is
// pending native review.
export const homeTr: HomeDict = {
  heroHook: heroLine({
    more: 'Daha çok başvuru.',
    silencePre: 'Daha çok ',
    silence: 'sessizlik',
    silencePost: '.',
    stop: 'Tahmin etmeyi bırak.',
    startPre: '',
    choose: 'Seçmeye',
    startPost: ' başla.',
  }),
  heroH1: (
    <>
      career-ops: açık kaynaklı yapay zeka iş arama{' '}ajanı.
      <br />
      CLI&apos;ında çalışır. Verilerin senin, makine senin.
      <br />
      CV&apos;ni uyarlar ve cevaplarının taslağını yazar.{' '}
      <span className="inline-block">Gönder&apos;e sen basarsın.</span>
    </>
  ),
  runItNow: 'Hemen çalıştır',
  locale: 'tr',
  docsHref: '/tr/docs',
  manifestoHref: '/manifesto',
  heroFreeNote: 'Adaylar için her zaman ücretsiz',
  featuredIn: 'Yer aldığı yayınlar',
  memberOf: 'Üyesi olduğu program',
  worthApplyingLabel: 'Bir iş ilanına başvurmaya değer mi, nasıl anlarsın? →',
  worthApplyingHref: '/tr/docs/introduction/guides/is-this-job-worth-applying-to',
  authorTagline: ', 16 yıllık işletmeci ve career-ops’un yaratıcısı',
  // No thesisTranslation for TR: the English thesis stands alone, as in FR, DE, PT, IT and ZH.
  nowSignedManifesto: <>Artık imzalı bir manifesto ·</>,
  readIt: 'Oku →',
  whatIsHeading: (
    <>
      {brand('career-ops')}{' '}
      <span className="text-landing-foreground dark:text-landing-foreground-dark">
        nedir?
      </span>
    </>
  ),
  whatIsBody: (
    <>
      career-ops, makinende yerel olarak, herhangi bir yapay zeka kodlama CLI&apos;ının
      içinde çalışan açık kaynaklı bir yapay zeka iş arama ajanıdır: Claude Code, OpenCode,
      Codex, GitHub Copilot ve daha fazlası. İş ilanlarını beş boyutlu bir değerlendirme
      çerçevesi ve bütünsel bir genel puanla, 1-5 arası, CV&apos;ne göre değerlendirir; her
      role göre uyarlanmış ATS uyumlu PDF CV&apos;ler üretir; Greenhouse, Ashby ve Lever
      formlarındaki açık uçlu sorulara cevap taslağı yazar; 150&apos;den fazla iş kaynağını
      hiç token harcamadan tarar ve süreci Go ile yazılmış bir terminal panosunda takip eder.
      Dosyaların makinende durur: {brand('bize ait sunucu yok')}, {brand('telemetri yok')},{' '}
      {brand('hesap yok')}. CV&apos;n makinenden seçtiğin yapay zeka sağlayıcısına gider,
      başka hiçbir yere gitmez. MIT lisanslıdır ve her zaman ücretsizdir; ödeme yapabileceğin
      tek şey seçtiğin yapay zeka motorudur, ücretsiz ve yerel modeller de çalışır. Santiago
      Fernández de Valderrama Aparicio tarafından, 2026&apos;daki gerçek bir iş arayışının
      ardından yapıldı: 740 ilan değerlendirildi → 68 başvuru → 12 mülakat → 1 teklif.
    </>
  ),
  statsComment: 'yıldız · Açık kaynak · MIT',
  commandCenter: (
    <>
      Herhangi bir yapay zeka kodlama CLI&apos;ını {brand('yapay zeka iş arama ajanına')} dönüştür.
    </>
  ),
  tryItOut: 'Dene',
  runsCommand: (
    <>
      Motor olarak bir yapay zeka kodlama CLI&apos;ı gerekir. Henüz yok mu?{' '}
      <a
        href="/tr/docs/free-ai-engine"
        className="text-fd-foreground underline underline-offset-2"
      >
        Ücretsiz bir tane kur
      </a>
      .
    </>
  ),
  mechanism:
    'Başvuruları bir tabloda elle takip etmek yerine portalları tarayan, uyarlanmış PDF’ler üreten ve her şeyi senin için takip eden yapay zeka destekli bir süreç kazanırsın.',
  analogy: (
    <>
      &ldquo;İş arayışında yanında bir kariyer koçu olması gibi, ama{' '}
      {brand('ücret ödemeden')}.&rdquo;
    </>
  ),
  featAgnosticTitle: 'Yapay zeka için doğdu, tedarikçiye bağlı değil',
  featAgnosticBody: (
    <>
      Herhangi bir kodlama CLI&apos;ıyla çalışır: Claude Code, OpenCode, Codex, GitHub
      Copilot ve daha fazlası. Open Agent Skill Standard üzerine kuruludur.
    </>
  ),
  featApplyTitle: 'Açık uçlu cevapların taslağını yazar.',
  featApplyBody1: (
    <>
      Greenhouse, Ashby ve Lever formları &ldquo;Neden bu rol?&rdquo; ve &ldquo;Bize bir
      projeni anlat&rdquo; diye sorar.{' '}
      <code className="font-mono text-brand">/career-ops apply</code> formu okur, her
      cevabın taslağını CV&apos;nden ve iş tanımından yazar ve yapıştırmaya hazır şekilde
      sana verir.
    </>
  ),
  featApplyBody2: 'Sen düzenlersin, sen gönderirsin. Asistan asla senin yerine tıklamaz.',
  featApplyCta: 'apply nasıl çalışır, gör',
  featScanTitle: '150’den fazla iş kaynağı. Elle arama yok.',
  featScanBody: (
    <>
      Önceden ayarlanmış tarayıcılar, aralarında Greenhouse, Ashby ve Lever&apos;ın da
      olduğu{' '}
      <a href="https://github.com/career-ops-hq/career-ops/blob/main/templates/portals.example.yml" target="_blank" rel="noopener" className="underline underline-offset-2 decoration-fd-muted-foreground/40 hover:decoration-fd-foreground">150&apos;den fazla iş kaynağını</a>{' '}
      istediğinde kontrol eder; hiç API token&apos;ı harcanmaz.{' '}
      <code className="font-mono text-brand">/career-ops scan</code> komutunu çalıştır,
      dakikalar içinde sıralı bir liste al.
    </>
  ),
  featScanCta: 'Tüm portalları gör',
  featCommunityTitle: 'Toplulukla birlikte geliştiriliyor.',
  featCommunityBody: (
    <>
      career-ops, gerçek bir iş arayışındaki insanların pull request&apos;leriyle büyüyor.
      Sorunlar Discord&apos;da ele alınır, düzeltmeler aynı hafta yayınlanır. Aracı yalnızca
      kullanmazsın, neye dönüşeceğini belirlemeye de yardım edersin.
    </>
  ),
  joinDiscord: (n) => `Discord'da ${n}+ geliştiriciye katıl`,
  openSourceTitle: '%100 açık kaynak.',
  starsWord: 'yıldız',
  forksWord: 'fork',
  repoOfDay: 'Günün 1 numaralı deposu',
  builtByDek: (
    <>
      <a href="/about" rel="author" className="text-fd-foreground font-medium hover:underline">
        Santiago Fernández de Valderrama Aparicio
      </a>{' '}
      tarafından, 740 iş ilanını değerlendirdikten sonra yapıldı.
      <br />
      Puanlama yönteminin tamamı{' '}
      <a href="/methodology" className="text-fd-foreground hover:underline underline-offset-2">
        yayında
      </a>
      .
      <br />
      Artık topluluk geliştiriyor.
    </>
  ),
  meetContributors: 'Katkıcılarımızla tanış →',
  faqHeading: 'Sık sorulan sorular',
  faq: [
    {
      q: 'career-ops iş ilanlarını nasıl puanlar?',
      a: (
        <>
          career-ops, beş boyutta bir değerlendirme çerçevesiyle yönlendirilen bir LLM
          değerlendirmesi kullanır: uyum, kuzey yıldızına yakınlık, ücret, kültür sinyalleri ve
          uyarı işaretleri. Sonuç, CV&apos;nin ve iş tanımının belirli satırlarına atıf yapan,
          1-5 arası bütünsel bir genel puandır. 4,0&apos;ın altındaki ilanlarda ajan başvurmamanı
          önerir. Kapalı bir formül yok, rastgele başvuru yağdırma yok. Değerlendirme çerçevesinin
          tamamı{' '}
          <a href="/methodology" className="text-fd-foreground hover:underline underline-offset-2">
            career-ops.org/methodology
          </a>{' '}
          adresinde yayında.
        </>
      ),
    },
    {
      q: 'career-ops benim yerime başvuru yapar mı?',
      a: (
        <>
          Hayır. Taslakları hazırlar ve alanları doldurur; asla göndermez. Gönder&apos;e sen
          basarsın. career-ops her başvuruyu tıklamaya kadar hazırlar: rolleri tarar, her birini
          CV&apos;ne göre puanlar ve CV&apos;ni uyarlar. Sonra kararı sana bırakır. Bu bilinçli
          bir tercihtir: toplu otomatik başvuru, işe alım uzmanları ve ATS sistemleri nezdindeki
          itibarını yakar. career-ops angaryayı kaldırır, seçimi sende bırakır. Daha fazlası (İngilizce):{' '}
          <a
            href="/blog/can-an-ai-agent-run-your-job-search"
            className="text-fd-foreground hover:underline underline-offset-2"
          >
            Can an AI agent run your whole job search?
          </a>
        </>
      ),
    },
    {
      q: 'career-ops ücretsiz mi? İş modeli ne?',
      a: (
        <>
          career-ops kalıcı olarak ücretsizdir, MIT lisanslıdır ve topluluk tarafından fonlanır.
          Ücretli plan, hesap, telemetri ve premium özellik yoktur. Depoyu klonlar, profilini
          ayarlar ve sistemi zaten kullandığın yapay zeka kodlama CLI&apos;ıyla yerel olarak
          çalıştırırsın. Sürdürülebilirlik, premium planlardan, ücretli özelliklerden veya
          verilerden değil, topluluk katkılarından ve projenin Open Collective&apos;teki kolektifi
          üzerinden gelen kurumsal sponsorluktan gelir. Fonlar, projenin mali ev sahibi Open
          Source Collective&apos;te herkese açık bir defterde tutulur ve bakım, güvenlik
          düzeltmeleri, sürümler ve belgeler için kullanılır. Ayrıntılar{' '}
          <a href="/sustain" className="text-fd-foreground hover:underline underline-offset-2">
            career-ops.org/sustain
          </a>{' '}
          adresinde.
        </>
      ),
    },
    {
      q: 'Verilerim nerede duruyor?',
      a: (
        <>
          career-ops verilerini kendi makinende, sana ait düz dosyalarda tutar: CV&apos;n, profilin,
          sürecin ve raporların yerel Markdown ve YAML dosyalarıdır. career-ops tamamen yerel olarak
          yapay zeka CLI&apos;ın üzerinden çalışır: hesap yok, telemetri yok, career-ops sunucusuna
          yüklenen hiçbir şey yok. Sistem güncellemeleri veri katmanına asla dokunmaz; bu ayrımın
          adı Data Contract&apos;tır. Bilgisayarından çıkan tek veri, seçtiğin yapay zeka CLI&apos;ının
          kendi sağlayıcısına gönderdiği veridir.
        </>
      ),
    },
    {
      q: 'career-ops’u kim yaptı?',
      a: (
        <>
          career-ops&apos;u, 16 yılı aşkın süredir ürün geliştiren{' '}
          <a href="/about" rel="author" className="text-fd-foreground hover:underline underline-offset-2">
            Santiago Fernández de Valderrama Aparicio
          </a>{' '}
          yaptı. 2009&apos;da İspanya&apos;da bir telefon tamir işletmesi kurdu ve 2025&apos;te satana
          kadar yönetti. 2026 başında kendi iş arayışını yönetmek için career-ops&apos;u oluşturdu ve
          artık ihtiyacı kalmayınca MIT lisansıyla açık kaynak yaptı. O zamana kadar onunla 740 ilan
          değerlendirmiş ve bir Head of Applied AI rolü almıştı. Altı ay sonra, tam zamanlı olarak
          career-ops&apos;u geliştirmek için o rolden ayrıldı.
        </>
      ),
    },
    {
      q: 'career-ops bir Claude Code becerisi mi, yoksa bağımsız bir araç mı?',
      a: (
        <>
          career-ops belirli bir CLI&apos;a bağlı değildir. Claude Code, OpenCode, Codex, GitHub
          Copilot ve daha fazlasıyla, yani kullanıcının zaten ödeme yaptığı yapay zeka kodlama ajanıyla
          çalışır. Beceri dosyaları (
          <code className="font-mono text-fd-foreground">modes/</code>) depoda düz markdown prompt&apos;ları
          olarak durur; beceri yüklemeyi destekleyen her ajan onları çağırabilir. Anthropic&apos;e özgü
          bir bağımlılık yoktur. Beceri yükleyicisi sayesinde en yaygın çalışma ortamı Claude Code&apos;dur,
          ama aynı modlar diğer CLI&apos;larda da değişmeden çalışır.
        </>
      ),
    },
    {
      q: 'career-ops’un CV denetleyicilerinden ve otomatik başvuru araçlarından farkı ne?',
      a: (
        <>
          career-ops açık kaynaklı ve MIT lisanslıdır, zaten kullandığın yapay zeka kodlama CLI&apos;ıyla
          kendi makinende yerel olarak çalışır ve değerlendirme çerçevesinin tamamını yayımlar. Her
          başvuruda karar insandadır; asla kendiliğinden göndermez. career-ops için hesap, telemetri ve
          abonelik yoktur; varsa tek düzenli maliyet seçtiğin yapay zeka motorudur. Belirli araçlarla
          dürüst, yan yana karşılaştırmalar için{' '}
          <a href="/compare" className="text-fd-foreground hover:underline underline-offset-2">
            career-ops.org/compare
          </a>{' '}
          sayfasına bak (İngilizce).
        </>
      ),
    },
    {
      q: 'career-ops hangi yapay zeka araçlarıyla çalışır?',
      a: (
        <>
          career-ops; Claude Code, Cursor, Codex, OpenCode, Pi, Antigravity CLI, Grok Build CLI, Qwen,
          Kimi, Hermes Agent ve GitHub Copilot CLI ile çalışır: on bir birinci sınıf CLI (Gemini CLI
          eski bir sarmalayıcıdır). Aynı mod dosyaları hepsinde çalışır. Herkes mevcut aboneliğine ve
          maliyet tercihine uyan CLI&apos;ı seçer; career-ops seni asla tek bir sağlayıcıya kilitlemez.
          Tipik bir iş arayışı ayda 20 $ olan Claude Pro ile yürür, ama seçim senin.
        </>
      ),
    },
  ],
  finalCta: 'Elenmek yerine ilanları elemeye hazır mısın?',
  yourTurn: 'Sıra sende',
  followWhatWeShip: 'Ya da yayımladıklarımızı takip et.',
  releaseBlurb: (
    <>
      Sürüm duyuruları ve ara sıra güncellemeler.
      <br />
      İstediğin zaman abonelikten çık.
    </>
  ),
};
